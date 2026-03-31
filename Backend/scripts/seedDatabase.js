import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';
import Tag from '../models/Tag.js';
import Notification from '../models/Notification.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stackit');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Question.deleteMany({});
    await Answer.deleteMany({});
    await Tag.deleteMany({});
    await Notification.deleteMany({});
    console.log('🧹 Database cleared');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  }
};

const seedUsers = async () => {
  const users = [
    {
      username: 'admin_user',
      email: 'admin@stackit.dev',
      password: 'password',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin_user',
      bio: 'StackIt Platform Administrator',
      location: 'Online',
      reputation: 1500,
      role: 'admin'
    },
    {
      username: 'demo_user',
      email: 'user@stackit.dev',
      password: 'password',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user',
      bio: 'Demo user for testing StackIt platform',
      location: 'Online',
      reputation: 350,
      role: 'user'
    },
    {
      username: 'john_developer',
      email: 'john@example.com',
      password: 'Password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john_developer',
      bio: 'Full-stack developer passionate about JavaScript and Web Development. 5+ years experience.',
      location: 'San Francisco, USA',
      website: 'https://johndeveloper.com',
      github: 'johndeveloper',
      reputation: 450,
      role: 'user'
    },
    {
      username: 'sarah_devops',
      email: 'sarah@example.com',
      password: 'Password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah_devops',
      bio: 'DevOps Engineer | Cloud Architecture | AWS Expert | Open Source Contributor',
      location: 'Austin, Texas',
      website: 'https://sarahdevops.dev',
      github: 'sarahdevops',
      linkedin: 'sarahdevops',
      reputation: 620,
      role: 'user'
    },
    {
      username: 'alex_data',
      email: 'alex@example.com',
      password: 'Password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex_data',
      bio: 'Data Scientist | Python Expert | Machine Learning Enthusiast',
      location: 'Mountain View, USA',
      website: 'https://alexdata.io',
      github: 'alexdata',
      twitter: 'alexdata',
      reputation: 850,
      role: 'user'
    },
    {
      username: 'emma_ux',
      email: 'emma@example.com',
      password: 'Password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma_ux',
      bio: 'UX/UI Designer | Frontend Developer | Design System Advocate',
      location: 'London, UK',
      reputation: 500,
      role: 'user'
    }
  ];

  try {
    // Use create() instead of insertMany() so pre-save hooks run
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    return [];
  }
};

const seedTags = async () => {
  const tags = [
    { name: 'javascript', description: 'For questions and discussions about JavaScript and ECMAScript', color: '#F7DF1E' },
    { name: 'react', description: 'A JavaScript library for building user interfaces with components', color: '#61DAFB' },
    { name: 'nodejs', description: 'JavaScript runtime built on Chrome\'s V8 engine', color: '#68A063' },
    { name: 'mongodb', description: 'Document-oriented NoSQL database', color: '#47A248' },
    { name: 'express', description: 'Minimal and flexible web application framework for Node.js', color: '#000000' },
    { name: 'typescript', description: 'Typed superset of JavaScript that compiles to JavaScript', color: '#3178C6' },
    { name: 'web-development', description: 'General web development topics and best practices', color: '#FF6B6B' },
    { name: 'api', description: 'Application Programming Interface design and development', color: '#4ECDC4' },
    { name: 'database', description: 'Database design, optimization, and management', color: '#FFE66D' },
    { name: 'security', description: 'Web security, authentication, authorization, and best practices', color: '#FF6B9D' }
  ];

  try {
    const createdTags = await Tag.insertMany(tags);
    console.log(`✅ Created ${createdTags.length} tags`);
    return createdTags;
  } catch (error) {
    console.error('❌ Error seeding tags:', error);
    return [];
  }
};

const seedQuestions = async (users, tags) => {
  const questions = [
    {
      title: 'How to implement authentication in a MERN stack application?',
      content: '<h3>I\'m building a MERN application and need to implement user authentication.</h3><p>What is the best approach to handle:</p><ul><li>Password hashing and storage</li><li>JWT token management</li><li>Protected routes in React</li><li>Session management</li></ul><p>Any best practices or common pitfalls to avoid?</p>',
      author: users[0]._id,
      tags: ['javascript', 'react', 'nodejs', 'security'],
      views: 245
    },
    {
      title: 'Performance optimization techniques for MongoDB queries',
      content: '<h3>My MongoDB queries are getting slower as the dataset grows.</h3><p>I\'m working with millions of documents and need to optimize performance.</p><pre><code>// Current slow query\ndb.users.find({ age: { $gt: 18 } }).sort({ createdAt: -1 }).limit(10)</code></pre><p>What are the best practices for:</p><ul><li>Proper indexing strategies</li><li>Query optimization</li><li>Schema design</li></ul>',
      author: users[1]._id,
      tags: ['mongodb', 'database', 'web-development'],
      views: 312
    },
    {
      title: 'React Hooks best practices for handling state and side effects',
      content: '<h3>How to properly use React Hooks in functional components?</h3><p>I\'m trying to understand the best practices for:</p><ul><li>useState for component state</li><li>useEffect for side effects</li><li>Custom hooks creation</li><li>Dependency arrays</li><li>Performance optimization with useMemo and useCallback</li></ul><p>What are the common mistakes to avoid?</p>',
      author: users[2]._id,
      tags: ['react', 'javascript', 'web-development'],
      views: 456
    },
    {
      title: 'How to build a scalable REST API with Express.js',
      content: '<h3>I want to build a production-ready REST API with Express.js.</h3><p>What should I consider for:</p><ul><li>Project structure and organization</li><li>Error handling and validation</li><li>Authentication and authorization</li><li>Rate limiting and security</li><li>Logging and monitoring</li></ul><p>Any recommended middleware or libraries?</p>',
      author: users[3]._id,
      tags: ['nodejs', 'express', 'api', 'web-development'],
      views: 189
    },
    {
      title: 'TypeScript vs JavaScript - when to use TypeScript?',
      content: '<h3>Should I migrate my existing JavaScript project to TypeScript?</h3><p>I\'m trying to decide whether to use TypeScript for a new project. Pros and cons:</p><ul><li>Learning curve and setup time</li><li>Development speed</li><li>Maintenance and scalability</li><li>Team expertise and hiring</li><li>Performance implications</li></ul><p>What are your experiences?</p>',
      author: users[4]._id,
      tags: ['typescript', 'javascript', 'web-development'],
      views: 523
    },
    {
      title: 'Securing Node.js API endpoints against common threats',
      content: '<h3>What are the essential security measures for a Node.js backend?</h3><p>I\'m building an API and want to protect it from:</p><ul><li>SQL/NoSQL injection</li><li>CSRF attacks</li><li>XSS vulnerabilities</li><li>DDoS attacks</li><li>Unauthorized access</li></ul><p>Any recommended packages or strategies?</p>',
      author: users[0]._id,
      tags: ['nodejs', 'security', 'api', 'express'],
      views: 267
    }
  ];

  try {
    const createdQuestions = await Question.insertMany(questions);
    console.log(`✅ Created ${createdQuestions.length} questions`);
    return createdQuestions;
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    return [];
  }
};

const seedAnswers = async (questions, users) => {
  const answers = [
    {
      content: '<p>Authentication in MERN is best done with JWT tokens. Here\'s a recommended approach:</p><ul><li><strong>Backend:</strong> Use bcryptjs for password hashing and jsonwebtoken for creating JWTs</li><li><strong>Frontend:</strong> Store token in localStorage or a secure cookie</li><li><strong>API calls:</strong> Include token in Authorization header</li></ul><pre><code>// Example\nheader: { Authorization: `Bearer ${token}` }</code></pre><p>For protected routes in React, create a ProtectedRoute component that checks if user is authenticated.</p>',
      author: users[1]._id,
      question: questions[0]._id,
      isAccepted: true,
      votes: {
        up: [{ user: users[0]._id }, { user: users[2]._id }, { user: users[3]._id }]
      }
    },
    {
      content: '<p>I\'ve implemented this successfully. Key points:</p><ol><li>Always hash passwords with bcrypt (salt rounds: 10-12)</li><li>Use httpOnly cookies for tokens (more secure than localStorage)</li><li>Implement token refresh mechanism</li><li>Add role-based access control (RBAC)</li><li>Use middleware to verify tokens on protected routes</li></ol><p>Setting this up takes about 2-3 hours if you follow best practices.</p>',
      author: users[4]._id,
      question: questions[0]._id,
      votes: {
        up: [{ user: users[0]._id }, { user: users[2]._id }]
      }
    },
    {
      content: '<p>For MongoDB performance optimization:</p><ul><li><strong>Indexing:</strong> Create indexes on frequently queried fields. Use explain() to analyze query performance.</li><li><strong>Query optimization:</strong> Use projection to return only needed fields</li><li><strong>Schema design:</strong> Consider denormalization for read-heavy operations</li></ul><pre><code>// Create composite index\ndb.users.createIndex({ age: 1, createdAt: -1 })</code></pre><p>Always test with realistic data volumes!</p>',
      author: users[3]._id,
      question: questions[1]._id,
      isAccepted: true,
      votes: {
        up: [{ user: users[1]._id }, { user: users[0]._id }]
      }
    },
    {
      content: '<p>React Hooks best practices:</p><ul><li><strong>useState:</strong> One state per concern, split complex state</li><li><strong>useEffect:</strong> Always specify dependency array</li><li><strong>Custom hooks:</strong> Extract reusable logic into custom hooks</li><li><strong>Performance:</strong> Use useMemo for expensive computations, useCallback for function references</li></ul><pre><code>// Good practice\nconst [count, setCount] = useState(0);\n\nuseEffect(() => {\n  // side effect\n  return () => { // cleanup };\n}, [dependencies]);</code></pre>',
      author: users[4]._id,
      question: questions[2]._id,
      isAccepted: true
    },
    {
      content: '<p>REST API project structure recommendation:</p><pre><code>project/\n├── src/\n│   ├── routes/\n│   ├── controllers/\n│   ├── middleware/\n│   ├── models/\n│   └── utils/\n├── config/\n├── tests/\n└── server.js</code></pre><p>Use helmet for security headers, express-validator for input validation, and winston for logging.</p>',
      author: users[2]._id,
      question: questions[3]._id,
      isAccepted: true
    }
  ];

  try {
    const createdAnswers = await Answer.insertMany(answers);
    console.log(`✅ Created ${createdAnswers.length} answers`);

    // Link answers to questions
    for (let i = 0; i < Math.min(answers.length, questions.length); i++) {
      const question = questions[i];
      const questionAnswers = answers.slice(i, i + 2);
      question.answers = questionAnswers.map(a => a._id);
      
      // Set first answer as accepted
      if (questionAnswers.length > 0) {
        question.acceptedAnswer = questionAnswers[0]._id;
      }
      
      await question.save();
    }

    console.log('✅ Linked answers to questions');
    return createdAnswers;
  } catch (error) {
    console.error('❌ Error seeding answers:', error);
    return [];
  }
};

const seedNotifications = async (users) => {
  const notifications = [
    {
      recipient: users[0]._id,
      sender: users[1]._id,
      type: 'answer',
      title: 'New Answer',
      message: 'Sarah posted an answer to your question',
      data: {
        questionId: null
      },
      isRead: true
    },
    {
      recipient: users[1]._id,
      sender: users[0]._id,
      type: 'vote',
      title: 'Answer Upvoted',
      message: 'John upvoted your answer',
      data: {
        answerId: null
      },
      isRead: false
    },
    {
      recipient: users[2]._id,
      sender: users[3]._id,
      type: 'mention',
      title: 'You were mentioned',
      message: 'Alex mentioned you in a comment',
      data: {},
      isRead: false
    }
  ];

  try {
    await Notification.insertMany(notifications);
    console.log(`✅ Created ${notifications.length} notifications`);
  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
  }
};

const seedDatabase = async () => {
  try {
    console.log('\n🌱 Starting database seed...\n');

    await connectDB();
    await clearDatabase();

    const users = await seedUsers();
    const tags = await seedTags();
    const questions = await seedQuestions(users, tags);
    await seedAnswers(questions, users);
    await seedNotifications(users);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log('   - Users: 7');
    console.log('   - Tags: 10');
    console.log('   - Questions: 6');
    console.log('   - Answers: 5');
    console.log('\n💡 Demo Credentials:');
    console.log('   Admin:');
    console.log('   Email: admin@stackit.dev');
    console.log('   Password: password');
    console.log('\n   Regular User:');
    console.log('   Email: user@stackit.dev');
    console.log('   Password: password\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
