


#  Bring the latest knowledge into Cursor using MCPs.

You can also use official MCP servers for specific frameworks. Because adding docs directly to Cursor sometimes works inconsistently, so I stopped relying on it.

Another approach is setting **Cursor Rules** to enforce coding style and guidelines. Finally, you can tell the model to do a web search models like Sonnet 4, GPT-4.1, or Gemini 2.5 often do this automatically when they need more info, or you can explicitly write “Research Online”.


# Everything you need to know about Cursor Rules

![](https://a.storyblok.com/f/316774/1600x900/6f0f157452/how-to-use-cursor-rules.png)

Many of us kept forgetting to do certain tasks before leaving the office. So, we created **our own rules and routines** to make sure they’re done every time. That’s essentially how Cursor Rules work.

![](https://a.storyblok.com/f/316774/1886x1085/7f67d85b1c/understand-cursorrules.jpeg)

A rules file in Cursor is like a guidebook for your AI coding assistant. it explains how to write code for your project, what tools are in use, and how everything is structured. This way, the AI can produce code that’s more accurate and better fits your setup.

![](https://a.storyblok.com/f/316774/1200x687/ea72667a4d/cursorrules-file.jpeg)


Add your "main" entry rule file: Hit `CMD + SHIFT + P` to open the command palette. Now search for `File: New Cursor Rule` and call it `instructions` and hit `Enter`

In the `description` field give it a useful name. For Globs, you can leave it blank or `add a *`, which acts as a wildcard and will be added to each chat.


![](https://a.storyblok.com/f/316774/2150x870/2d35d95f2f/cursorrules_mdc-1.png)



For example, you might use rules to tell the AI things like `“use TypeScript”, “follow ESLint standards”`, `“prefer functional components over class components in React”`, or even `project-specific rules` like “`we’re using Tailwind CSS for styling`” or `“don’t use any deprecated API”`. Essentially, it’s context that applies globally to your project.


Keep Rules Separated: If we made kitchen rules too, we wouldn’t put them with the office rules. We’d write them on a separate paper and put it on the kitchen door. Each place has its own rules.

![](https://a.storyblok.com/f/316774/1690x986/9a4f029248/office-rules-v2.jpeg)




Cascade Cursor Rules: Trong bản update mới nhất của Cursor, bạn có thể set khi nào nó sẽ **Call a Cursor Rule**. Bạn có thể combine nhiều rules cùng lúc. Như trong screenshot, mình có một rule “global” và một rule riêng cho extensions.

![](https://a.storyblok.com/f/316774/1200x675/b29206e231/stack-cursor-rules.jpeg)




**:ignore files**: Dùng **.cursorignore** cho những file mà bạn không bao giờ muốn Cursor index. .**cursorindexignore** cũng sẽ không bị index, nhưng khác ở chỗ bạn vẫn có thể reference chúng trong chat bằng @.

Ví dụ: bạn có một folder docs chứa rất nhiều file markdown documentation. Bạn muốn reference mấy file này khi cần, nhưng không muốn Cursor index hết.  Trường hợp này dùng .cursorindexignore là hợp lý.



# Reference 

1. [14 Practical Cursor Tips From Daily Use](https://www.instructa.ai/blog/cursor-ai/cursor-pro-tips-2025)  

2. [Everything you need to know about Cursor Rules](https://www.instructa.ai/blog/cursor-ai/everything-you-need-to-know-cursor-rules)