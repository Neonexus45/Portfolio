// Skills data for the interactive skill tree
const skillTree = {
  name: "Skills",
  children: [
    {
      name: "Technical",
      children: [
        {
          name: "Programming",
          children: [
            { name: "Python", level: 5 },
            { name: "C/C++", level: 4 },
            { name: "Java", level: 4 },
            { name: "C#", level: 4 },
            { name: "TypeScript", level: 4 },
            { name: "Rust", level: 3 }
          ]
        },
        {
          name: "AI & Data",
          children: [
            { name: "RAG Architecture", level: 5 },
            { name: "LLM", level: 5 },
            { name: "Data Engineering", level: 5 },
            { name: "Big Data", level: 4 }
          ]
        },
        {
          name: "Web & Mobile",
          children: [
            { name: "React", level: 3 },
            { name: "React Native", level: 3 }
          ]
        },
        {
          name: "Cloud",
          children: [
            { name: "AWS", level: 4 },
            { name: "Serverless", level: 3 }
          ]
        }
      ]
    },
    {
      name: "Soft Skills",
      children: [
        { name: "Problem Solving", level: 4 },
        { name: "Communication", level: 4 },
        { name: "Teamwork", level: 4 },
        { name: "Adaptability", level: 5 },
        { name: "Leadership", level: 3 }
      ]
    }
  ]
};

export default skillTree;
