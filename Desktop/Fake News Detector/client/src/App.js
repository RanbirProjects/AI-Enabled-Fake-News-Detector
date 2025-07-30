import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// Import custom SVG icons
import { 
  TextIcon, 
  LinkIcon, 
  TitleIcon, 
  HistoryIcon, 
  InfoIcon, 
  CheckIcon, 
  AlertIcon,
  SearchIcon,
  AIIcon,
  AnalyticsIcon,
  ShieldIcon
} from './icons';

function App() {
  const [newsContent, setNewsContent] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'url', or 'image'
  const [confidenceScore, setConfidenceScore] = useState(0);

  // Get API URL from environment variable or use default
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch previous detections
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/news`, {
          timeout: 5000 // 5 second timeout
        });
        setHistory(response.data);
      } catch (err) {
        console.error('Error fetching history:', err);
        // Don't show error to user, just use empty history
        setHistory([]);
      }
    };
    
    fetchHistory();
  }, [API_URL]);

  const validateInput = () => {
    if (activeTab === 'text' && !newsContent.trim()) {
      setError('Please enter some news content');
      return false;
    } else if (activeTab === 'url' && !newsUrl.trim()) {
      setError('Please enter a news URL');
      return false;
    } else if (activeTab === 'title' && !newsTitle.trim()) {
      setError('Please enter a news title');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Prepare request data based on active tab
      const requestData = {};
      if (activeTab === 'text') {
        requestData.content = newsContent;
      } else if (activeTab === 'url') {
        requestData.url = newsUrl;
      } else if (activeTab === 'title') {
        requestData.title = newsTitle;
      }
      
      const response = await axios.post(`${API_URL}/api/news/detect`, requestData, {
        timeout: 10000 // 10 second timeout
      });
      
      // Calculate confidence score (0-100) from the explanation
      let score = 50; // Default neutral score
      if (response.data.result === 'fake') {
        // Extract score if available in the explanation
        const scoreMatch = response.data.explanation.match(/score: (\d+\.\d+)/);
        if (scoreMatch && scoreMatch[1]) {
          // Convert score from 0-2 scale to 0-100 scale for fake news
          score = Math.min(100, Math.round(parseFloat(scoreMatch[1]) * 50));
        } else {
          score = 75; // Default fake score if not found
        }
      } else {
        // For real news, invert the score (higher means more real)
        const scoreMatch = response.data.explanation.match(/score: (\d+\.\d+)/);
        if (scoreMatch && scoreMatch[1]) {
          // Convert score from 0-2 scale to 0-100 scale for real news (inverted)
          score = Math.max(0, 100 - Math.round(parseFloat(scoreMatch[1]) * 50));
        } else {
          score = 25; // Default real score if not found
        }
      }
      
      setConfidenceScore(score);
      setResult(response.data);
      setHistory([response.data, ...history]);
      
      // Clear the input fields
      setNewsContent('');
      setNewsUrl('');
      setNewsTitle('');
    } catch (err) {
      console.error('Error detecting fake news:', err);
      
      // If server is unavailable, perform client-side detection
      if (err.code === 'ECONNABORTED' || !err.response) {
        // Simple client-side detection as fallback
        let content = '';
        if (activeTab === 'text') {
          content = newsContent;
        } else if (activeTab === 'title') {
          content = newsTitle;
        } else {
          content = newsUrl; // Limited analysis for URLs
        }
        
        const contentLower = content.toLowerCase();
        let isFake = false;
        let explanation = '';
        let score = 50; // Default score
        
        // Very simple detection logic for client-side fallback
        if (/\b(fake|hoax|conspiracy|scam)\b/i.test(contentLower)) {
          isFake = true;
          explanation = 'Contains suspicious keywords that may indicate fake news.';
          score = 75;
        } else if (/\b(shocking truth|they don't want you to know)\b/i.test(contentLower)) {
          isFake = true;
          explanation = 'Contains sensationalist language typical of fake news.';
          score = 80;
        } else if (/!{2,}/.test(content) || /\b[A-Z]{4,}\b/.test(content)) {
          isFake = true;
          explanation = 'Contains excessive punctuation or ALL CAPS typical of fake news.';
          score = 70;
        } else {
          explanation = 'No obvious indicators of fake news detected.';
          score = 30;
        }
        
        setConfidenceScore(score);
        
        const fallbackResult = {
          _id: Date.now().toString(),
          content: content,
          result: isFake ? 'fake' : 'real',
          explanation: 'SERVER OFFLINE - Client-side analysis: ' + explanation,
          createdAt: new Date()
        };
        
        setResult(fallbackResult);
        setHistory([fallbackResult, ...history]);
        
        // Clear the input fields
        setNewsContent('');
        setNewsUrl('');
        setNewsTitle('');
        
        setError('Server is unavailable. Using simplified client-side detection.');
      } else {
        setError('Failed to analyze the news content. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>AI-Enabled Fake News Detector</h1>
          <p className="subtitle">Advanced computational analysis to identify fake news content</p>
        </div>
      </header>
      
      <div className="hero-section">
        <div className="hero-content">
          <h2>Combat Misinformation with AI Technology</h2>
          <p>Our advanced AI system uses Machine Learning, Deep Learning, and Natural Language Processing to analyze and detect fake news with high accuracy.</p>
        </div>
      </div>
      
      <main className="container">
        <section className="detector-section">
          <div className="card">
            <h2 className="section-title">Analyze Content</h2>
            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                onClick={() => setActiveTab('text')}
              >
                Text Content
              </button>
              <button 
                className={`tab-btn ${activeTab === 'url' ? 'active' : ''}`}
                onClick={() => setActiveTab('url')}
              >
                News URL
              </button>
              <button 
                className={`tab-btn ${activeTab === 'title' ? 'active' : ''}`}
                onClick={() => setActiveTab('title')}
              >
                News Title
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {activeTab === 'text' && (
                <div className="form-group">
                  <label htmlFor="newsContent">Enter news content to analyze:</label>
                  <textarea
                    id="newsContent"
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    placeholder="Paste news article or content here..."
                    rows="6"
                    disabled={loading}
                  />
                </div>
              )}
              
              {activeTab === 'url' && (
                <div className="form-group">
                  <label htmlFor="newsUrl">Enter news URL to analyze:</label>
                  <input
                    type="url"
                    id="newsUrl"
                    value={newsUrl}
                    onChange={(e) => setNewsUrl(e.target.value)}
                    placeholder="https://example.com/news-article"
                    disabled={loading}
                  />
                  <p className="input-note">Note: URL analysis is simulated in this demo</p>
                </div>
              )}
              
              {activeTab === 'title' && (
                <div className="form-group">
                  <label htmlFor="newsTitle">Enter news title to analyze:</label>
                  <input
                    type="text"
                    id="newsTitle"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    placeholder="Enter the headline or title of the news article"
                    disabled={loading}
                  />
                </div>
              )}
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Analyzing...' : 'Detect Fake News'}
              </button>
            </form>
          </div>
          
          {result && (
            <div className="card result-container">
              <div className={`result-card ${result.result === 'fake' ? 'fake' : 'real'}`}>
                <div className="result-header">
                  <h2 className="result-title">
                    {result.result === 'fake' ? '🚫 Fake News Detected' : '✅ Real News'}
                  </h2>
                  <div className="confidence-meter">
                    <div className="confidence-label">Confidence</div>
                    <div className="meter-container">
                      <div 
                        className={`meter-fill ${result.result === 'fake' ? 'fake' : 'real'}`}
                        style={{ width: `${confidenceScore}%` }}
                      ></div>
                    </div>
                    <div className="confidence-value">{confidenceScore}%</div>
                  </div>
                </div>
                
                <div className="result-body">
                  <div className="explanation-section">
                    <h3>Analysis</h3>
                    <p className="result-explanation">{result.explanation}</p>
                  </div>
                  
                  <div className="content-section">
                    <h3>Analyzed Content</h3>
                    <div className="analyzed-content">
                      <p>{result.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        
        <aside className="sidebar">
          <section className="card history-section">
            <h2 className="section-title">Detection History</h2>
            {history.length === 0 ? (
              <p className="no-history">No detection history yet</p>
            ) : (
              <ul className="history-list">
                {history.map((item) => (
                  <li key={item._id} className={`history-item ${item.result}`}>
                    <div className="history-header">
                      <span className="history-badge">{item.result}</span>
                      <span className="history-date">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="history-content">{item.content.substring(0, 100)}{item.content.length > 100 ? '...' : ''}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
          
          <section className="card info-section">
            <h2 className="section-title">About Fake News Detection</h2>
            <div className="info-content">
              <p>Fake news is deliberate and intentional misinformation that consists of fabricated news stories with the intent to mislead.</p>
              <p>Our AI-enabled detector uses advanced computational models to identify fake content and help users make more informed decisions.</p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">📝</div>
                  <div className="feature-text">Text Analysis</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🔗</div>
                  <div className="feature-text">URL Verification</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📰</div>
                  <div className="feature-text">Title Examination</div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </main>
      
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI-Enabled Fake News Detector</h3>
            <p>Helping communities make more informed decisions</p>
          </div>
          <div className="footer-section">
            <h3>Potential Applications</h3>
            <ul className="footer-list">
              <li>Smart Cities & Safe Cities</li>
              <li>Law Enforcement Agencies</li>
              <li>Intelligence Analysis</li>
              <li>Media Organizations</li>
            </ul>
          </div>
          <div className="footer-section">
            <p>&copy; {new Date().getFullYear()} Fake News Detector | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
