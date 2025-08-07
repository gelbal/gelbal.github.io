---
title: "Strategic vs. Tactical Programming with AI"
thumbnail: "/assets/images/2025-03-25-strategic-vs-tactical-programming-with-ai/olympics2024-yusuf-dikec.png"
category: "essay"
tags: ["latest", "AI agents", "AI adoption"]
date: 2025-03-25
excerpt: "In this one I discuss John Ousterhout's philosophy on software design, emphasizing the balance between tactical and strategic programming. I reflect on a project utilizing AI for device classification, highlighting AI's strengths in rapid prototyping while addressing challenges like design misalignment and code readability."
---
From John Ousterhout's [A Philosophy of Software Design](https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design), this wisdom resonates more than ever:

> Your primary goal must be to produce a great design, which also happens to work.

I've been thinking about this principle a lot during a recent project, where I investigated improving device classification in our analytics events data. This post shares my journey with AI assistance — what worked, what didn't, and how to better approach AI-assisted development.

* * *

Ousterhout describes two approaches to development:

1. **Tactical programming:** "Make this work now!" (Accelerates complexity debt)
2. **Strategic programming:** "Reveal the cleanest path!" (Builds adaptive simplicity)

AI amplifies both approaches. AI is a tactical programming superstar, generating working code at lightning speed. But without strategic guidance, it can churn out what one of the reviewers diplomatically called "too much code" (spoiler alert: it was unnecessarily complex and difficult to maintain).

![Tactical vs Strategical. Image from Olympics 2024](/assets/images/2025-03-25-strategic-vs-tactical-programming-with-ai/olympics2024-yusuf-dikec.png)

Tactical patterns compound complexity, while strategic foundations create compounding simplicity.

My experience revealed both sides:

### **The 80/20 Advantage: Rapid Prototyping**

AI delivered 80% of solutions in hours, particularly when:

- Implementing similar patterns across files
- Applying specified changes consistently across the codebase
- Generating boilerplate code that would be time-consuming to write manually
- Quickly exploring different implementation approaches

This rapid prototyping validated my approach in days rather than weeks, allowing me to get early feedback before investing in refinement.

### **The Challenge: From 80% to 100%**

While AI excelled at reaching 80% completion quickly, the path to 100% revealed challenges:

1. **Design philosophy mismatches**: Initially, I instructed the AI using Ousterhout’s principles and asked for an application framework approach. My reviewers, however, preferred a simpler Unix-style data pipeline philosophy. A fundamental mismatch I didn’t anticipate.
2. **Code readability concerns**: Reviewers noted the AI-generated code had redundant comments, unnecessary exception handling for scenarios that would never happen, and was just wordy. So wordy.
3. **Refactoring complexity**: When feedback suggested simplification, I stubbornly tried to refactor the prototype instead of starting fresh. This decision complicated everything. (I'll share what I should have done instead below!)
4. **Reviewer perception**: I noticed subtle bias against _AI-generated code_, reminiscent of how early Japanese manufacturing was once mocked but is now revered for quality. We're in the early skepticism phase with AI code, and overcoming these perceptions requires extra attention to quality.

## **From Coding Assistant to Design Catalyst**

We can choose strategic over tactical programming with AI. The key shift happens when we frame problems as design challenges, equip AI with architectural context, and prioritize readability over cleverness. This transforms AI from a complexity generator into a clarity catalyst.

Based on my experience, here are practices that help:

### **1\. Prioritize Design Over Implementation**

Complexity is more apparent to readers than writers. This becomes especially important with AI as a new "writer" in our systems. Before asking AI to generate a single line of code:

- Clearly define the problem and desired outcomes
- Choose an architectural approach that aligns with team standards
- Provide explicit design constraints and guidelines

### **2\. Start Fresh After Prototyping**

One of my key realizations: **It's often better to discard the prototype entirely** rather than try to refactor it. AI makes starting fresh nearly as fast as refactoring, but with cleaner results.

After the prototype confirms your approach:

- Extract the key insights and lessons
- Define a cleaner architecture based on those insights
- Ask AI to implement the new design from scratch

### **3\. Embrace Multiple Approaches**

AI enables exploration of multiple design options with minimal extra effort:

- Generate 3-5 different architectural approaches
- Evaluate tradeoffs between simplicity, performance, and maintainability
- Choose the best elements from each approach

### **4\. Build Robust Validation**

AI may generate code that seems correct but contains subtle errors:

- Before implementation, write thorough tests.
- Have checks for dead code and redundant files.
- Watch out for AI’s tendency to “fix” failing tests by removing them rather than addressing the underlying issues — a surprisingly human-like shortcut.

### **5\. Apply Human Taste**

The most valuable human contribution is what I call _taste_ — the ability to discern:

- Which problems are worth solving
- What constitutes elegant design
- When to favor simplicity over cleverness
- How to balance competing concerns

Provide examples of your team's best code to guide AI's style and approach. This _taste transfer_ is the most effective way to improve AI output quality.

## **Conclusion:** **Working Code is not Enough!**

We're still early in learning how to effectively collaborate with AI on software projects. My experience suggests we should use _more_ AI, not less — but in a more directed, thoughtful way.

In future projects, I plan to:

- Start with small, specific tasks for AI
- Provide clearer examples of desired outcomes
- Generate multiple implementations and compare them
- Create stronger validation frameworks upfront
- Focus more on design and less on implementation details

Working code is not enough! As Ousterhout reminds us, our primary goal must be to produce a great design that is clean, simple, and obvious — which just happens to work. With AI as our partner, this goal is more achievable than ever.
