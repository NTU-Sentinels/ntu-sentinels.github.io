import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

configs = [
    {
        'txt': 'insta.txt',
        'out': 'assets/images/contact/instagram.png',
        # Ultra-vibrant neon sunset
        'stops': [(0.0, '#FF1493'), (0.25, '#FF2A85'), (0.5, '#FF4D4D'), (0.75, '#FF9234'), (1.0, '#FFD93D')],
    },
    {
        'txt': 'linkedin.txt',
        'out': 'assets/images/contact/linkedin.png',
        # Ultra-vibrant electric cyber blue
        'stops': [(0.0, '#00E5FF'), (0.35, '#00A8FF'), (0.7, '#38BDF8'), (1.0, '#70E1FF')],
    },
    {
        'txt': 'telegram.txt',
        'out': 'assets/images/contact/telegram.png',
        # Ultra-vibrant laser cyan
        'stops': [(0.0, '#00FFFF'), (0.3, '#00E0FF'), (0.65, '#38BDF8'), (1.0, '#A6F4FF')],
    },
    {
        'txt': 'discord.txt',
        'out': 'assets/images/contact/discord.png',
        # Ultra-vibrant electric blurple
        'stops': [(0.0, '#7289DA'), (0.3, '#8C9EFF'), (0.65, '#A5B4FC'), (1.0, '#C7D2FE')],
    }
]

W = 900
H = 900

font_size = 16
font = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', font_size, index=1)

for cfg in configs:
    with open(cfg['txt'], 'r', encoding='utf-8') as f:
        raw_lines = [l.rstrip('\r\n') for l in f]

    start = 0
    while start < len(raw_lines) and not raw_lines[start].strip():
        start += 1
    end = len(raw_lines)
    while end > start and not raw_lines[end-1].strip():
        end -= 1
    lines = raw_lines[start:end]

    max_c = max(len(l) for l in lines)
    lines = [l.ljust(max_c) for l in lines]

    char_w = W / max_c
    char_h = H / len(lines)

    # 1. Base mask
    mask = Image.new('L', (W, H), 0)
    draw = ImageDraw.Draw(mask)

    for r, line in enumerate(lines):
        y = int(r * char_h)
        for c, ch in enumerate(line):
            if ch != ' ':
                x = int(c * char_w)
                # Stroke width ensures solid, unbroken character strokes
                draw.text((x, y), ch, font=font, fill=255, stroke_width=1, stroke_fill=255)

    # 2. Add subtle bloom/glow layer
    glow_mask = mask.filter(ImageFilter.GaussianBlur(radius=3))

    # 3. Create vibrant diagonal gradient
    x_coords = np.linspace(0, 1, W)
    y_coords = np.linspace(0, 1, H)
    xx, yy = np.meshgrid(x_coords, y_coords)
    t = (xx + yy) / 2.0

    r_arr = np.zeros_like(t)
    g_arr = np.zeros_like(t)
    b_arr = np.zeros_like(t)

    parsed_stops = [(s[0], hex_to_rgb(s[1])) for s in cfg['stops']]
    for i in range(len(parsed_stops) - 1):
        s0, c0 = parsed_stops[i]
        s1, c1 = parsed_stops[i+1]
        seg_mask = (t >= s0) & (t <= s1) if i < len(parsed_stops) - 2 else (t >= s0)
        local_t = np.clip((t - s0) / (s1 - s0), 0, 1)
        r_arr = np.where(seg_mask, c0[0] + (c1[0] - c0[0]) * local_t, r_arr)
        g_arr = np.where(seg_mask, c0[1] + (c1[1] - c0[1]) * local_t, g_arr)
        b_arr = np.where(seg_mask, c0[2] + (c1[2] - c0[2]) * local_t, b_arr)

    # Combine sharp mask with glow
    sharp_np = np.array(mask).astype(float)
    glow_np = np.array(glow_mask).astype(float) * 0.4
    combined_alpha = np.clip(sharp_np + glow_np, 0, 255).astype(np.uint8)

    rgba = np.dstack([r_arr.astype(np.uint8), g_arr.astype(np.uint8), b_arr.astype(np.uint8), combined_alpha])
    result_img = Image.fromarray(rgba, 'RGBA')

    os.makedirs(os.path.dirname(cfg['out']), exist_ok=True)
    temp_path = cfg['out'] + '.tmp'
    result_img.save(temp_path, 'PNG', optimize=True)
    os.replace(temp_path, cfg['out'])

    # Also mirror directly to _site if it exists to avoid file watcher race conditions
    site_out = os.path.join('_site', cfg['out'])
    if os.path.exists('_site'):
        os.makedirs(os.path.dirname(site_out), exist_ok=True)
        import shutil
        shutil.copy2(cfg['out'], site_out)

    print(f'Successfully rendered vibrant asset {cfg["out"]} ({W}x{H})')
