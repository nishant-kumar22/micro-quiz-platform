export async function GET() {
  const categories = [
    {
      id: 'history',
      name: 'History',
      description: 'Test your knowledge of historical events and figures',
      icon: '🏛️'
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Explore questions about physics, chemistry, and biology',
      icon: '🔬'
    },
    {
      id: 'math',
      name: 'Math',
      description: 'Challenge yourself with mathematical problems',
      icon: '📊'
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'Test your coding knowledge and software development skills',
      icon: '💻'
    }
  ];

  return Response.json(categories);
}