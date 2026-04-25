---
title: Linux系统上安装和使用Astbot
published: 2026-04-25
description: 'Linux系统上安装及基础设置'
image: ''
tags: [Linux,教程,Astbot]
category: 'Linux,Astbot'
draft: false 
lang: 'zh-CN'
---
## AstrBot介绍

AstrBot 是一款开源轻量的聊天机器人框架，支持AI agent与多平台对接（QQ、微信、飞书等）。内置插件系统及可视化面板，拥有上千款插件，可快速实现自动化回复、群管、定时任务，轻松打造专属智能助手。

## 1.安装
在liunx系统下在终端输入以下命令（使用脚本安装）
```bash
bash <(curl -sSL https://raw.githubusercontent.com/zhende1113/Antlia/refs/heads/main/Script/AstrBot/Antlia.sh)
```
若你的电脑没有curl，可以使用wegt
```bash
wget -qO- https://raw.githubusercontent.com/zhende1113/Antlia/refs/heads/main/Script/AstrBot/Antlia.sh | bash
```

> [!tip]
> 如果uv sync失败,用以下命令修改环境变量
>
> ```bash
> echo 'export UV_LINK_MODE=copy' >> ~/.bashrc
> source ~/.bashrc
> ```
> 再正常用命令启动。
> ```bash
> uv run main.py
> ```
> 如果uv下载依赖时，遇到网络问题，可以设置镜像源来解决。
> ```bash
> echo 'export UV_DEFAULT_INDEX="https://pypi.tuna.tsinghua.edu.cn/simple"' >> ~/.bashrc
> source ~/.bashrc
> ```

[AstrBot仓库](https://github.com/AstrBotDevs/AstrBot/)

[AstrBot官网文档](https://docs.astrbot.app/)

[脚本仓库地址](https://github.com/zhende1113/Antlia/)