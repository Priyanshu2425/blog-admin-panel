import React, { useState } from 'react';
import { PlusCircle, Calendar, Clock, Edit2, Trash2, LayoutGrid } from 'lucide-react';

// Types for our blog posts
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  status: 'published' | 'scheduled' | 'draft';
  scheduledDate?: string;
  coverImage: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'new'>('all');
  const [blogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Getting Started with React and TypeScript',
      excerpt: 'Learn the basics of using TypeScript with React to build type-safe applications.',
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Advanced State Management Patterns',
      excerpt: 'Explore different state management approaches in modern React applications.',
      status: 'scheduled',
      scheduledDate: '2024-03-20',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const BlogCard = ({ post }: { post: BlogPost }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
              <Edit2 size={18} />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm ${
            post.status === 'published' ? 'bg-green-100 text-green-800' :
            post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
          {post.scheduledDate && (
            <span className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              {post.scheduledDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const NewBlogForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Blog Post</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
            placeholder="Write your blog content..."
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Publish Now
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
          >
            <Clock size={16} className="mr-2" />
            Schedule
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <LayoutGrid className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Blog Admin</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Scheduled
            </button>
          </div>
          <button
            onClick={() => setActiveTab('new')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusCircle size={18} className="mr-2" />
            New Post
          </button>
        </div>

        {activeTab === 'new' ? (
          <NewBlogForm />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(post =>
                activeTab === 'scheduled'
                  ? post.status === 'scheduled'
                  : true
              )
              .map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;