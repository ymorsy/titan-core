#!/usr/bin/env python3
"""
Generates valid PNG icons for PWA & iOS Home Screen using Python standard library.
No third-party packages required.
"""
import zlib
import struct
import math
import os

def create_titan_icon_png(size):
    # Generates a PNG with dark background and vibrant electric-green / cyan glowing emblem
    raw_data = bytearray()
    center_x = size / 2.0
    center_y = size / 2.0
    radius = size * 0.44

    for y in range(size):
        raw_data.append(0)  # Filter byte None
        ny = (y - center_y) / radius
        for x in range(size):
            nx = (x - center_x) / radius
            dist_sq = nx * nx + ny * ny
            
            # Default dark background #0a0d14
            r, g, b = 10, 13, 20
            
            # Rounded squircle / circle container for app icon
            # iOS squircle approx: x^4 + y^4 <= 1.2
            squircle = (nx**4 + ny**4)
            if squircle < 0.85:
                # Inside inner glowing card
                t = (ny + 1.0) / 2.0 # 0 at top, 1 at bottom
                # Deep dark card background #161f32
                r = int(18 + 10 * t)
                g = int(25 + 12 * t)
                b = int(42 + 20 * t)

                # Lightning bolt shape approximation
                # Coordinates normalized -0.5 to 0.5
                bx, by = nx * 1.5, ny * 1.5
                # Simple lightning bolt points:
                # Top sharp point: (0.1, -0.6)
                # Middle bend: (-0.3, 0.0) -> (0.05, 0.0)
                # Bottom sharp point: (-0.1, 0.6)
                in_bolt = False
                if -0.6 <= by <= 0.0:
                    left_edge = -0.3 + 0.4 * ((by + 0.6) / 0.6)
                    right_edge = 0.25 - 0.2 * ((by + 0.6) / 0.6)
                    if left_edge - 0.15 <= bx <= right_edge + 0.15:
                        in_bolt = True
                elif 0.0 < by <= 0.6:
                    left_edge = -0.15 - 0.15 * (by / 0.6)
                    right_edge = 0.2 - 0.3 * (by / 0.6)
                    if left_edge - 0.15 <= bx <= right_edge + 0.15:
                        in_bolt = True
                
                if in_bolt:
                    # Electric Lime to Laser Cyan gradient
                    # #00ff87 (0, 255, 135) to #60efff (96, 239, 255)
                    gt = (by + 0.6) / 1.2
                    r = int(0 * (1 - gt) + 96 * gt)
                    g = int(255 * (1 - gt) + 239 * gt)
                    b = int(135 * (1 - gt) + 255 * gt)
            elif squircle < 0.95:
                # Subtle border glow
                r = int(0 + 30 * (1 - dist_sq))
                g = int(180 + 75 * (1 - dist_sq))
                b = int(140 + 60 * (1 - dist_sq))

            # Clamp
            r = max(0, min(255, r))
            g = max(0, min(255, g))
            b = max(0, min(255, b))
            raw_data.extend([r, g, b])

    compressed = zlib.compress(raw_data, 9)
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    png.extend(struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc))
    
    # IDAT
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png.extend(struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc))
    
    # IEND
    iend_crc = zlib.crc32(b'IEND')
    png.extend(struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc))
    
    return bytes(png)

def main():
    dir_path = os.path.dirname(os.path.abspath(__file__))
    
    sizes = {
        'icon-192.png': 192,
        'icon-512.png': 512,
        'apple-touch-icon.png': 180
    }
    
    for filename, size in sizes.items():
        out_path = os.path.join(dir_path, filename)
        data = create_titan_icon_png(size)
        with open(out_path, 'wb') as f:
            f.write(data)
        print(f"Generated {filename} ({size}x{size}): {len(data)} bytes")

if __name__ == '__main__':
    main()
