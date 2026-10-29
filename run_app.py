#!/usr/bin/env python3
"""
TITAN CORE - Local Wi-Fi & Multi-Device Server Launcher
Automatically discovers local Wi-Fi IP address so iPhones and iPads
on the same network can open and install the app immediately.
"""
import http.server
import socketserver
import webbrowser
import socket
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    """Finds the LAN IP address of this machine (e.g., 192.168.x.x)"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, max-age=0')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.webmanifest') or path.endswith('manifest.json'):
            return 'application/manifest+json'
        if path.endswith('.png'):
            return 'image/png'
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

def start_server():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    local_url = f"http://localhost:{PORT}"
    network_url = f"http://{local_ip}:{PORT}"

    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        httpd = socketserver.TCPServer(("", PORT), CustomHandler)
    except OSError:
        global PORT
        PORT = 8081
        local_url = f"http://localhost:{PORT}"
        network_url = f"http://{local_ip}:{PORT}"
        httpd = socketserver.TCPServer(("", PORT), CustomHandler)

    print("\n" + "═" * 68)
    print("  ⚡ TITAN CORE - 13yo Calisthenics & Six-Pack Academy")
    print("═" * 68)
    print(f"  💻 On this Mac:     {local_url}")
    print(f"  📱 On iPhone / iPad: {network_url}")
    print("═" * 68)
    print("  📲 HOW TO OPEN ON IPHONE OR IPAD:")
    print(f"  1. Connect your iPhone/iPad to the same Wi-Fi network.")
    print(f"  2. Open Safari and go to: {network_url}")
    print("  3. Tap the Share button (square with arrow) -> 'Add to Home Screen'")
    print("  4. Titan Core will install as a native fullscreen app with its icon!")
    print("═" * 68)
    print("  Press Ctrl+C to stop the server.\n")

    try:
        webbrowser.open(local_url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped. Stay strong!")
        sys.exit(0)

if __name__ == '__main__':
    start_server()
