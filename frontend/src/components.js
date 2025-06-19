import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Mock data for tweets
const mockTweets = [
  {
    id: 1,
    user: {
      id: 2,
      username: 'techguru',
      displayName: 'Tech Guru',
      handle: '@techguru',
      avatar: 'https://images.pexels.com/photos/32514707/pexels-photo-32514707.jpeg',
      verified: true
    },
    content: 'Just shipped a new feature that will revolutionize how we think about social media! The future is here 🚀',
    timestamp: '2h',
    likes: 234,
    retweets: 89,
    replies: 45,
    media: ['https://images.unsplash.com/photo-1623715537851-8bc15aa8c145'],
    liked: false,
    retweeted: false
  },
  {
    id: 2,
    user: {
      id: 3,
      username: 'naturelover',
      displayName: 'Nature Explorer',
      handle: '@naturelover',
      avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806',
      verified: false
    },
    content: 'Early morning hike through the mountains. Nothing beats the serenity of nature at sunrise 🌄✨ #NaturePhotography #MountainLife',
    timestamp: '4h',
    likes: 156,
    retweets: 23,
    replies: 12,
    media: ['https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg'],
    liked: true,
    retweeted: false
  },
  {
    id: 3,
    user: {
      id: 4,
      username: 'foodie_chef',
      displayName: 'Chef Maria',
      handle: '@foodie_chef',
      avatar: 'https://images.unsplash.com/photo-1702482527875-e16d07f0d91b',
      verified: true
    },
    content: 'Tonight\'s special: Pan-seared salmon with herb-crusted vegetables. The perfect balance of flavors! 👨‍🍳',
    timestamp: '6h',
    likes: 89,
    retweets: 34,
    replies: 18,
    media: ['https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg'],
    liked: false,
    retweeted: true
  },
  {
    id: 4,
    user: {
      id: 5,
      username: 'sports_fan',
      displayName: 'Sports Central',
      handle: '@sports_fan',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
      verified: true
    },
    content: 'What an incredible match! The determination and skill level was off the charts 🏀 #Basketball #Sports',
    timestamp: '8h',
    likes: 445,
    retweets: 156,
    replies: 67,
    media: ['https://images.pexels.com/photos/32619186/pexels-photo-32619186.jpeg'],
    liked: true,
    retweeted: false
  },
  {
    id: 5,
    user: {
      id: 6,
      username: 'travel_addict',
      displayName: 'Wanderlust Sam',
      handle: '@travel_addict',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
      verified: false
    },
    content: 'Lost in the beauty of Tokyo streets. Every corner tells a different story 🏙️ #Tokyo #Travel #StreetPhotography',
    timestamp: '12h',
    likes: 278,
    retweets: 45,
    replies: 23,
    media: ['https://images.unsplash.com/photo-1486064527234-be85f601691a'],
    liked: false,
    retweeted: false
  },
  {
    id: 6,
    user: {
      id: 7,
      username: 'artist_soul',
      displayName: 'Creative Mind',
      handle: '@artist_soul',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      verified: false
    },
    content: 'Working on a new digital art piece inspired by urban landscapes. Art is everywhere if you know where to look 🎨',
    timestamp: '1d',
    likes: 167,
    retweets: 28,
    replies: 15,
    media: ['https://images.pexels.com/photos/32561410/pexels-photo-32561410.png'],
    liked: true,
    retweeted: false
  }
];

const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: { name: 'Tech Guru', handle: '@techguru', avatar: 'https://images.pexels.com/photos/32514707/pexels-photo-32514707.jpeg' },
    content: 'liked your tweet',
    timestamp: '5m',
    read: false
  },
  {
    id: 2,
    type: 'retweet',
    user: { name: 'Nature Explorer', handle: '@naturelover', avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806' },
    content: 'retweeted your tweet',
    timestamp: '15m',
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: { name: 'Chef Maria', handle: '@foodie_chef', avatar: 'https://images.unsplash.com/photo-1702482527875-e16d07f0d91b' },
    content: 'started following you',
    timestamp: '1h',
    read: true
  }
];

const trendingTopics = [
  { topic: '#TechInnovation', tweets: '45.2K Tweets' },
  { topic: '#NaturePhotography', tweets: '23.1K Tweets' },
  { topic: '#FoodieLife', tweets: '18.7K Tweets' },
  { topic: '#Sports2025', tweets: '67.3K Tweets' },
  { topic: '#TravelDiaries', tweets: '29.8K Tweets' }
];

const whoToFollow = [
  {
    id: 8,
    name: 'Design Studio',
    handle: '@designstudio',
    avatar: 'https://images.unsplash.com/photo-1655834648155-f7a98ff3c49d',
    verified: true
  },
  {
    id: 9,
    name: 'Coffee Enthusiast',
    handle: '@coffeeaddict',
    avatar: 'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg',
    verified: false
  },
  {
    id: 10,
    name: 'Urban Explorer',
    handle: '@citylife',
    avatar: 'https://images.unsplash.com/photo-1686713741589-61f370e819c9',
    verified: false
  }
];

// Sidebar Navigation Component
export const Sidebar = ({ currentUser, darkMode }) => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const navItems = [
    { icon: '🏠', label: 'Home', path: '/', active: true },
    { icon: '🔍', label: 'Explore', path: '/explore' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '✉️', label: 'Messages', path: '/messages' },
    { icon: '🔖', label: 'Bookmarks', path: '/bookmarks' },
    { icon: '📝', label: 'Lists', path: '/lists' },
    { icon: '👤', label: 'Profile', path: `/profile/${currentUser.username}` },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="sidebar">
      {/* X Logo */}
      <div className="logo-container">
        <div className="x-logo">𝕏</div>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <Link 
            key={index}
            to={item.path} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Tweet Button */}
      <button className="tweet-btn">
        <span className="tweet-btn-text">Post</span>
        <span className="tweet-btn-icon">✏️</span>
      </button>

      {/* User Profile */}
      <div className="user-profile-sidebar">
        <img src={currentUser.avatar} alt={currentUser.displayName} className="profile-avatar" />
        <div className="profile-info">
          <div className="profile-name">{currentUser.displayName}</div>
          <div className="profile-handle">{currentUser.handle}</div>
        </div>
        <div className="profile-menu">⋯</div>
      </div>
    </div>
  );
};

// Tweet Composer Component
export const TweetComposer = ({ currentUser, onTweet }) => {
  const [tweetText, setTweetText] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const maxChars = 280;

  const handleTweet = () => {
    if (tweetText.trim()) {
      const newTweet = {
        id: Date.now(),
        user: currentUser,
        content: tweetText,
        timestamp: 'now',
        likes: 0,
        retweets: 0,
        replies: 0,
        media: mediaFiles,
        liked: false,
        retweeted: false
      };
      onTweet(newTweet);
      setTweetText('');
      setMediaFiles([]);
    }
  };

  return (
    <div className="tweet-composer">
      <img src={currentUser.avatar} alt={currentUser.displayName} className="composer-avatar" />
      
      <div className="composer-content">
        <textarea
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening?"
          className="composer-textarea"
          maxLength={maxChars}
        />
        
        <div className="composer-actions">
          <div className="media-buttons">
            <button className="media-btn">🖼️</button>
            <button className="media-btn">📊</button>
            <button className="media-btn">😊</button>
            <button className="media-btn">📅</button>
            <button className="media-btn">📍</button>
          </div>
          
          <div className="post-controls">
            <div className="char-count">
              <span className={tweetText.length > maxChars - 20 ? 'char-limit-warning' : ''}>
                {maxChars - tweetText.length}
              </span>
            </div>
            <button 
              className="post-btn"
              onClick={handleTweet}
              disabled={!tweetText.trim() || tweetText.length > maxChars}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tweet Component
export const Tweet = ({ tweet, currentUser, onLike, onRetweet, onReply }) => {
  const navigate = useNavigate();

  return (
    <div className="tweet" onClick={() => navigate(`/tweet/${tweet.id}`)}>
      <img 
        src={tweet.user.avatar} 
        alt={tweet.user.displayName} 
        className="tweet-avatar"
      />
      
      <div className="tweet-content">
        <div className="tweet-header">
          <span className="tweet-author">{tweet.user.displayName}</span>
          {tweet.user.verified && <span className="verified-badge">✓</span>}
          <span className="tweet-handle">{tweet.user.handle}</span>
          <span className="tweet-timestamp">· {tweet.timestamp}</span>
        </div>
        
        <div className="tweet-text">{tweet.content}</div>
        
        {tweet.media && tweet.media.length > 0 && (
          <div className="tweet-media">
            {tweet.media.map((media, index) => (
              <img key={index} src={media} alt="Tweet media" className="media-image" />
            ))}
          </div>
        )}
        
        <div className="tweet-actions">
          <button 
            className="action-btn reply-btn"
            onClick={(e) => { e.stopPropagation(); onReply(tweet.id); }}
          >
            💬 {tweet.replies}
          </button>
          <button 
            className={`action-btn retweet-btn ${tweet.retweeted ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onRetweet(tweet.id); }}
          >
            🔄 {tweet.retweets}
          </button>
          <button 
            className={`action-btn like-btn ${tweet.liked ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onLike(tweet.id); }}
          >
            ❤️ {tweet.likes}
          </button>
          <button className="action-btn share-btn">
            📤
          </button>
        </div>
      </div>
    </div>
  );
};

// Right Sidebar Component
export const RightSidebar = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="right-sidebar">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Trending */}
      <div className="trending-section">
        <h2>What's happening</h2>
        {trendingTopics.map((trend, index) => (
          <div key={index} className="trending-item">
            <div className="trend-topic">{trend.topic}</div>
            <div className="trend-count">{trend.tweets}</div>
          </div>
        ))}
        <button className="show-more-btn">Show more</button>
      </div>

      {/* Who to Follow */}
      <div className="who-to-follow">
        <h2>Who to follow</h2>
        {whoToFollow.map((user) => (
          <div key={user.id} className="follow-suggestion">
            <img src={user.avatar} alt={user.name} className="suggestion-avatar" />
            <div className="suggestion-info">
              <div className="suggestion-name">
                {user.name}
                {user.verified && <span className="verified-badge">✓</span>}
              </div>
              <div className="suggestion-handle">{user.handle}</div>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
        <button className="show-more-btn">Show more</button>
      </div>
    </div>
  );
};

// Main Layout Component
export const XLayout = ({ children, currentUser, darkMode, setDarkMode }) => {
  return (
    <div className="x-layout">
      <Sidebar currentUser={currentUser} darkMode={darkMode} />
      <main className="main-content">
        {children}
      </main>
      <RightSidebar darkMode={darkMode} />
    </div>
  );
};

// Home Feed Component
export const Home = ({ currentUser }) => {
  const [tweets, setTweets] = useState(mockTweets);
  const [feedType, setFeedType] = useState('for-you'); // 'for-you' or 'following'

  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  const handleLike = (tweetId) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { ...tweet, liked: !tweet.liked, likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1 }
        : tweet
    ));
  };

  const handleRetweet = (tweetId) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { ...tweet, retweeted: !tweet.retweeted, retweets: tweet.retweeted ? tweet.retweets - 1 : tweet.retweets + 1 }
        : tweet
    ));
  };

  const handleReply = (tweetId) => {
    console.log('Reply to tweet:', tweetId);
  };

  return (
    <div className="home-feed">
      {/* Header */}
      <div className="feed-header">
        <div className="feed-tabs">
          <button 
            className={`feed-tab ${feedType === 'for-you' ? 'active' : ''}`}
            onClick={() => setFeedType('for-you')}
          >
            For you
          </button>
          <button 
            className={`feed-tab ${feedType === 'following' ? 'active' : ''}`}
            onClick={() => setFeedType('following')}
          >
            Following
          </button>
        </div>
        <button className="settings-btn">⚙️</button>
      </div>

      {/* Tweet Composer */}
      <TweetComposer currentUser={currentUser} onTweet={handleNewTweet} />

      {/* Tweets Feed */}
      <div className="tweets-feed">
        {tweets.map(tweet => (
          <Tweet 
            key={tweet.id} 
            tweet={tweet} 
            currentUser={currentUser}
            onLike={handleLike}
            onRetweet={handleRetweet}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
};

// Profile Component
export const Profile = ({ currentUser }) => {
  const { username } = useParams();
  const isOwnProfile = username === currentUser.username;
  
  const profileUser = isOwnProfile ? currentUser : {
    id: 99,
    username: username,
    displayName: 'Profile User',
    handle: `@${username}`,
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
    bio: 'This is a sample profile page',
    followers: 856,
    following: 234,
    joined: 'January 2020',
    verified: false
  };

  const userTweets = mockTweets.filter(tweet => 
    isOwnProfile ? tweet.user.id === currentUser.id : tweet.user.username === username
  );

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn">←</button>
        <div className="profile-header-info">
          <div className="profile-header-name">{profileUser.displayName}</div>
          <div className="profile-header-tweets">{userTweets.length} posts</div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-banner">
        <div className="banner-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1686713741589-61f370e819c9)'}}></div>
        <div className="profile-info-section">
          <img src={profileUser.avatar} alt={profileUser.displayName} className="profile-pic" />
          {!isOwnProfile && (
            <div className="profile-actions">
              <button className="follow-profile-btn">Follow</button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-name-section">
          <h1>{profileUser.displayName}</h1>
          {profileUser.verified && <span className="verified-badge">✓</span>}
        </div>
        <div className="profile-handle">{profileUser.handle}</div>
        <div className="profile-bio">{profileUser.bio}</div>
        <div className="profile-meta">
          <span>📅 Joined {profileUser.joined}</span>
        </div>
        <div className="profile-stats">
          <span><strong>{profileUser.following}</strong> Following</span>
          <span><strong>{profileUser.followers}</strong> Followers</span>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="profile-tabs">
        <button className="profile-tab active">Posts</button>
        <button className="profile-tab">Replies</button>
        <button className="profile-tab">Media</button>
        <button className="profile-tab">Likes</button>
      </div>

      {/* User's Tweets */}
      <div className="profile-tweets">
        {userTweets.length > 0 ? (
          userTweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} currentUser={currentUser} />
          ))
        ) : (
          <div className="no-tweets">No posts yet</div>
        )}
      </div>
    </div>
  );
};

// Explore Component
export const Explore = () => {
  return (
    <div className="explore-page">
      <div className="explore-header">
        <div className="search-container-large">
          <input type="text" placeholder="Search" className="search-input-large" />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="explore-tabs">
        <button className="explore-tab active">For you</button>
        <button className="explore-tab">Trending</button>
        <button className="explore-tab">News</button>
        <button className="explore-tab">Sports</button>
        <button className="explore-tab">Entertainment</button>
      </div>

      <div className="explore-content">
        {mockTweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

// Notifications Component
export const Notifications = ({ currentUser }) => {
  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <button className="settings-btn">⚙️</button>
      </div>

      <div className="notifications-tabs">
        <button className="notification-tab active">All</button>
        <button className="notification-tab">Verified</button>
        <button className="notification-tab">Mentions</button>
      </div>

      <div className="notifications-list">
        {mockNotifications.map(notification => (
          <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
            <div className="notification-icon">
              {notification.type === 'like' && '❤️'}
              {notification.type === 'retweet' && '🔄'}
              {notification.type === 'follow' && '👤'}
            </div>
            <img src={notification.user.avatar} alt={notification.user.name} className="notification-avatar" />
            <div className="notification-content">
              <div className="notification-text">
                <strong>{notification.user.name}</strong> {notification.content}
              </div>
              <div className="notification-time">{notification.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages Component
export const Messages = ({ currentUser }) => {
  const conversations = [
    {
      id: 1,
      user: { name: 'Tech Guru', handle: '@techguru', avatar: 'https://images.pexels.com/photos/32514707/pexels-photo-32514707.jpeg' },
      lastMessage: 'Thanks for the follow!',
      timestamp: '2h',
      unread: true
    }
  ];

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h1>Messages</h1>
        <button className="new-message-btn">✉️</button>
      </div>

      <div className="messages-search">
        <input type="text" placeholder="Search Direct Messages" className="messages-search-input" />
      </div>

      <div className="conversations-list">
        {conversations.map(conversation => (
          <div key={conversation.id} className="conversation-item">
            <img src={conversation.user.avatar} alt={conversation.user.name} className="conversation-avatar" />
            <div className="conversation-content">
              <div className="conversation-header">
                <span className="conversation-name">{conversation.user.name}</span>
                <span className="conversation-handle">{conversation.user.handle}</span>
                <span className="conversation-time">· {conversation.timestamp}</span>
              </div>
              <div className="conversation-preview">{conversation.lastMessage}</div>
            </div>
            {conversation.unread && <div className="unread-indicator"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Tweet Detail Component
export const TweetDetail = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const tweet = mockTweets.find(t => t.id === parseInt(id));
  
  if (!tweet) {
    return (
      <div className="tweet-detail-page">
        <div className="tweet-detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h1>Post</h1>
        </div>
        <div className="tweet-not-found">Tweet not found</div>
      </div>
    );
  }

  return (
    <div className="tweet-detail-page">
      <div className="tweet-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1>Post</h1>
      </div>

      <div className="tweet-detail">
        <div className="tweet-detail-user">
          <img src={tweet.user.avatar} alt={tweet.user.displayName} className="tweet-detail-avatar" />
          <div className="tweet-detail-user-info">
            <div className="tweet-detail-name">
              {tweet.user.displayName}
              {tweet.user.verified && <span className="verified-badge">✓</span>}
            </div>
            <div className="tweet-detail-handle">{tweet.user.handle}</div>
          </div>
        </div>

        <div className="tweet-detail-content">{tweet.content}</div>

        {tweet.media && tweet.media.length > 0 && (
          <div className="tweet-detail-media">
            {tweet.media.map((media, index) => (
              <img key={index} src={media} alt="Tweet media" className="tweet-detail-media-image" />
            ))}
          </div>
        )}

        <div className="tweet-detail-timestamp">
          {tweet.timestamp} · Jan 1, 2025 · <strong>{tweet.likes + tweet.retweets}</strong> Views
        </div>

        <div className="tweet-detail-stats">
          <span><strong>{tweet.retweets}</strong> Reposts</span>
          <span><strong>{tweet.likes}</strong> Likes</span>
        </div>

        <div className="tweet-detail-actions">
          <button className="detail-action-btn">💬</button>
          <button className="detail-action-btn">🔄</button>
          <button className="detail-action-btn">❤️</button>
          <button className="detail-action-btn">📤</button>
        </div>
      </div>

      <div className="reply-composer">
        <img src={currentUser.avatar} alt={currentUser.displayName} className="reply-avatar" />
        <div className="reply-input-container">
          <textarea placeholder="Post your reply" className="reply-textarea"></textarea>
          <button className="reply-btn">Reply</button>
        </div>
      </div>
    </div>
  );
};