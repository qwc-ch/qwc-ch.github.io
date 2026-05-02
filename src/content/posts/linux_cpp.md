---
title: linux_cpp
published: 2026-05-02
description: ''
image: ''
tags: []
category: ''
draft: true
lang: ''
---
2026 年最新 Ubuntu C++ 开发环境搭建指南：基于 VS Code、Clang、CMake、Ninja 和 vcpkg

Linux 凭借其丰富的工具生态和出色的性能，一直是 C++ 开发者的热门选择。本指南将带你一步步在 Ubuntu 24.04 上，用 Visual Studio Code 搭配 Clang、CMake、Ninja 和 vcpkg，搭建一个现代化的 C++ 开发环境，并最终完成一个基于 C++20 模块 的示例项目。

我们需要安装的四个核心组件是：

· 编译器: Clang
· 项目构建: CMake
· 本地构建: Ninja
· 依赖管理: vcpkg

下面我们分步骤来安装和配置它们。

第一步：安装 Clang 编译器

Clang 不仅错误提示友好，还总能快速支持最新的 C++ 标准。根据 LLVM 项目发布页面显示，截至 2026 年 4 月，最新的稳定版本是 Clang 22.1.3。

LLVM 社区的开发非常活跃，Clang 23 也已发布了预发布版本（2026年4月13日），正处于积极的测试阶段。我们选择稳定版本。

使用 LLVM 官方脚本是最便捷的安装方式。

1. 下载并执行安装脚本：
   ```bash
   wget https://apt.llvm.org/llvm.sh
   chmod +x llvm.sh
   sudo ./llvm.sh 22
   ```
   执行脚本后，它会自动添加 LLVM 的官方 APT 仓库，并安装 clang-22 及相关的所有工具。
2. 配置默认版本：
   由于安装后的编译器名为 clang-22，我们需要通过 update-alternatives 命令来设置系统级的默认调用，方便我们直接在终端使用 clang 命令。
   ```bash
   # - 依次执行以下命令，将 Clang 22 设置为默认编译器
   sudo update-alternatives --install /usr/bin/clang clang /usr/bin/clang-22 100
   sudo update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-22 100
   sudo update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-22 100
   sudo update-alternatives --install /usr/bin/lldb lldb /usr/bin/lldb-22 100
   sudo update-alternatives --install /usr/bin/lld lld /usr/bin/lld-22 100
   sudo update-alternatives --install /usr/bin/clang-tidy clang-tidy /usr/bin/clang-tidy-22 100
   sudo update-alternatives --install /usr/bin/clang-format clang-format /usr/bin/clang-format-22 100
   ```
   执行完后，通过 clang --version 命令验证，你应该能看到类似 "clang version 22.1.3" 的输出信息。

第二步：安装 CMake 构建系统

CMake 是 C++ 项目管理的核心，它能够生成不同构建系统所需的文件。自 CMake 4.0 起，项目引入了许多现代化改进。根据 Kitware 官方发布页面，当前 CMake 4.3.1 是我们可以获得的最新稳定版本。

由于 CMake 4.3.1 在部分 Ubuntu 发行版中可能仍需要通过官方脚本安装，这里给出通过 CMake 官方提供的通用安装脚本的安装方式：

1. 下载安装脚本：
   ```bash
   wget https://github.com/Kitware/CMake/releases/download/v4.3.1/cmake-4.3.1-linux-x86_64.sh
   ```
2. 运行脚本：
   ```bash
   chmod +x cmake-4.3.1-linux-x86_64.sh
   sudo ./cmake-4.3.1-linux-x86_64.sh --prefix=/opt/cmake-4.3.1 --skip-license
   ```
3. 配置默认版本：
   ```bash
   sudo update-alternatives --install /usr/bin/cmake cmake /opt/cmake-4.3.1/bin/cmake 100
   sudo update-alternatives --install /usr/bin/ctest ctest /opt/cmake-4.3.1/bin/ctest 100
   sudo update-alternatives --install /usr/bin/cpack cpack /opt/cmake-4.3.1/bin/cpack 100
   ```

现在运行 cmake --version，你应该会看到版本号为 4.3.1。

第三步：安装 Ninja 构建工具

Ninja 是一个极其快速的构建工具，它专注于用最快的速度完成编译任务，非常适合配合 CMake 使用。目前最新的 Ninja 稳定版本是 1.13.2。

我们可以从 Ninja 的 GitHub 发布页面获取预编译好的二进制文件，快速完成安装：

```bash
# 下载最新的 Ninja 二进制包
wget https://github.com/ninja-build/ninja/releases/download/v1.13.2/ninja-linux.zip

# 解压并将可执行文件移动到系统路径
unzip ninja-linux.zip
sudo mv ninja /usr/bin/ninja
sudo chmod +x /usr/bin/ninja

# 验证安装
ninja --version
```

第四步：安装 vcpkg 包管理器

vcpkg 是由微软主导的跨平台 C++ 库管理器，能够帮助我们一键安装和管理众多的 C++ 第三方库，极大简化了项目依赖问题。根据 2026 年 4 月的发布页面信息，最新的稳定版本是 2026.04.08。

1. 克隆仓库并引导安装：
   ```bash
   # 进入你想要安装 vcpkg 的目录（例如用户主目录）
   cd ~
   git clone https://github.com/microsoft/vcpkg.git
   cd vcpkg
   
   # 注意：Linux 环境下，引导脚本是 .sh 结尾的文件！
   ./bootstrap-vcpkg.sh
   ```
2. 配置环境变量：
   将以下内容添加到你的 Shell 配置文件中（例如 ~/.bashrc 或 ~/.zshrc），并根据你的实际安装路径进行调整后重启终端或执行 source：
   ```bash
   # - 将 CMake 和 vcpkg 添加到 PATH 和系统变量
   export PATH=/opt/cmake-4.3.1/bin:$PATH
   export VCPKG_ROOT=~/vcpkg
   export PATH=$VCPKG_ROOT:$PATH
   ```

配置完成后，运行 vcpkg --version 即可看到当前版本。

第五步：配置 Visual Studio Code

VS Code 是我们编写代码的核心编辑器。请确保你已从官方网站下载并安装了最新版。为了获得最佳的 C++ 开发体验，请在扩展市场搜索并安装以下关键插件：

· 核心插件：
  · Clangd (作者: LLVM)：提供精准的代码补全、跳转和实时诊断。
  · CodeLLDB (作者: Vadim Chugunov)：一个强大的本地调试器，与 VS Code 深度集成。
  · CMake Tools (作者: Microsoft)：让你可以直接在 VS Code 中配置、构建和运行 CMake 项目。
  · CMake (作者: Microsoft)：为 CMakeLists.txt 文件提供语法高亮等支持。

第六步：实战！构建和运行你的第一个 C++ 程序

现在，我们用 C++20 最令人兴奋的特性之一——“模块 (Modules)”，来作为你的第一个项目。

1. 项目结构

创建一个项目文件夹，使其具有如下结构：

```
CppProject/
├── .vscode/
│   └── launch.json      # - 调试配置文件 (稍后创建)
├── CMakeLists.txt      # - CMake 项目配置
├── CMakePresets.json   # - CMake 预设 (简化构建命令)
├── main.cpp           # - 主程序文件
├── utilities.ixx       # - 一个简单的 C++20 模块
└── vcpkg.json         # - vcpkg 依赖描述
```

2. 配置代码和调试器

这是 utilities.ixx 模块文件的内容：

```cpp
module;
#include <string>
export module utilities;
export auto get_greeting() {
    return "Hello from a C++20 Module!";
}
```

这是主程序文件 main.cpp 的内容：

```cpp
import utilities;
#include <fmt/core.h>
int main() {
    fmt::print("{}\n", get_greeting());
    return 0;
}
```

接下来是调试配置。在 .vscode/launch.json 文件中粘贴以下内容，注意 program 的路径需要和你实际的构建输出目录相匹配：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug (LLDB)",
            "program": "${workspaceFolder}/build/linux_clang/Debug/Rocket",
            "args": [],
            "cwd": "${workspaceFolder}"
        }
    ]
}
```

3. 配置、构建与运行

1. 选择预设：在 VS Code 中打开项目文件夹，按下 Ctrl+Shift+P 打开命令面板，输入并选择 CMake: Select Configure Preset。根据你的操作系统和编译器，为你自动选择一个合适的预设。
2. 开始构建：再次打开命令面板，输入并选择 CMake: Build，或直接按快捷键 F7。你会看到 CMake 调用 Clang 和 Ninja，飞速地完成编译和链接。
3. 运行与调试：一切顺利的话，点击 VS Code 底部的 ▶️ 按钮即可运行你的程序。设置好断点后，按下 F5 启动调试，你就可以使用 F10 单步执行，并实时查看变量值了。

总结与关键提示

恭喜！你已经成功搭建了一套强大且符合现代 C++ 最佳实践的开发环境。这个工作流不仅适用于单人学习，也适用于大型协作工程。

在整个过程中有两点很重要：

1. 在所有安装完成后，务必通过 --version 命令验证各个工具的版本，确保环境变量配置正确。
2. 为 VS Code 配置的 launch.json 文件是你项目的“一键启动器”。当你创建新项目时，别忘了将这个文件复制到新项目的 .vscode 目录中，并根据新项目生成的可执行文件路径，调整其中的 "program" 字段。