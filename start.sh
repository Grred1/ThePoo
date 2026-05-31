#!/bin/bash
# 屎记 The Poo - 本地启动脚本
# 使用 Python 内置 HTTP 服务器，纯离线运行

PORT=8000
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  ╔══════════════════════════════╗"
echo "  ║   屎记  The Poo  🐾          ║"
echo "  ║   纯离线丑萌便便图鉴          ║"
echo "  ╚══════════════════════════════╝"
echo ""
echo "  🔗  http://localhost:${PORT}"
echo ""

cd "$DIR" && python3 -m http.server "$PORT"
