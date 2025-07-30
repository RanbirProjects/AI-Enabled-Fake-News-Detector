const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Enhanced fake news detection logic
function detectFakeNews(input, inputType = 'text') {
  // This is a more sophisticated rule-based detection system
  // In a production environment, this would be replaced with a proper ML model
  
  let content = input;
  
  // Handle different input types
  if (inputType === 'url') {
    // For URLs, we would normally fetch and analyze the content
    // For this demo, we'll analyze the URL itself and add some URL-specific patterns
    content += " This content was retrieved from a URL source.";
  } else if (inputType === 'title') {
    // For titles, we might apply different weights to patterns
    content += " This is a news headline or title.";
  }
  
  const contentLower = content.toLowerCase();
  
  // Define suspicious patterns and keywords
  const suspiciousPatterns = [
    { pattern: /\b(fake|hoax|conspiracy|scam)\b/i, weight: 0.7 },
    { pattern: /\b(shocking truth|they don't want you to know|what they aren't telling you)\b/i, weight: 0.6 },
    { pattern: /\b(miracle cure|secret remedy|doctors hate|one weird trick)\b/i, weight: 0.8 },
    { pattern: /\b(\d+% of people|studies show|scientists prove)\b/i, weight: 0.3 },
    { pattern: /\b(government cover-up|illuminati|new world order)\b/i, weight: 0.7 },
    { pattern: /\b(share before deleted|banned information|censored news)\b/i, weight: 0.8 }
  ];
  
  // Check for clickbait titles
  const clickbaitPatterns = [
    { pattern: /\b(you won't believe|mind-blowing|jaw-dropping)\b/i, weight: 0.5 },
    { pattern: /\b(this will change everything|life-changing|revolutionary)\b/i, weight: 0.4 },
    { pattern: /\b(\d+ reasons why|\d+ things|top \d+)\b/i, weight: 0.3 }
  ];
  
  // Check for credibility indicators
  const credibilityIndicators = [
    { pattern: /\b(according to research|study published in|experts at)\b/i, weight: -0.4 },
    { pattern: /\b(university of|professor|dr\.|research team)\b/i, weight: -0.3 },
    { pattern: /\b(official statement|press release|announced today)\b/i, weight: -0.3 }
  ];
  
  // URL-specific patterns (only applied for URL input type)
  const urlPatterns = [];
  if (inputType === 'url') {
    urlPatterns.push(
      { pattern: /\.(gov|edu)(\/|$)/i, weight: -0.5 }, // Government or educational domains are more trustworthy
      { pattern: /\.(info|xyz|tk)(\/|$)/i, weight: 0.3 }, // Some TLDs are more associated with spam
      { pattern: /free|discount|deal|offer/i, weight: 0.2 }, // Commercial/promotional terms in URL
      { pattern: /news|daily|times|post/i, weight: -0.1 } // News-related terms in domain
    );
  }
  
  // Title-specific patterns (only applied for title input type)
  const titlePatterns = [];
  if (inputType === 'title') {
    titlePatterns.push(
      { pattern: /^[A-Z\s]+[!?]*$/i, weight: 0.4 }, // All caps titles
      { pattern: /\?{2,}|!{2,}/g, weight: 0.3 }, // Multiple question or exclamation marks
      { pattern: /breaking|urgent|alert/i, weight: 0.2 } // Urgency terms
    );
  }
  
  // Calculate suspicion score
  let suspicionScore = 0;
  let explanations = [];
  let detailsForConfidence = [];
  
  // Check suspicious patterns
  for (const { pattern, weight } of suspiciousPatterns) {
    if (pattern.test(contentLower)) {
      suspicionScore += weight;
      const patternText = pattern.toString().replace(/\/\\b\(|\)\\b\/i/g, '').replace(/\|/g, ' or ');
      explanations.push(`Contains suspicious language pattern: "${patternText}"`);
      detailsForConfidence.push({ type: 'suspicious', weight });
    }
  }
  
  // Check clickbait patterns
  for (const { pattern, weight } of clickbaitPatterns) {
    if (pattern.test(contentLower)) {
      suspicionScore += weight;
      const patternText = pattern.toString().replace(/\/\\b\(|\)\\b\/i/g, '').replace(/\|/g, ' or ');
      explanations.push(`Contains clickbait language: "${patternText}"`);
      detailsForConfidence.push({ type: 'clickbait', weight });
    }
  }
  
  // Check credibility indicators
  for (const { pattern, weight } of credibilityIndicators) {
    if (pattern.test(contentLower)) {
      suspicionScore += weight; // Note: these have negative weights
      const patternText = pattern.toString().replace(/\/\\b\(|\)\\b\/i/g, '').replace(/\|/g, ' or ');
      explanations.push(`Contains credibility indicator: "${patternText}"`);
      detailsForConfidence.push({ type: 'credibility', weight });
    }
  }
  
  // Check URL-specific patterns
  for (const { pattern, weight } of urlPatterns) {
    if (pattern.test(content)) {
      suspicionScore += weight;
      const patternText = pattern.toString().replace(/\/|\\.|\\\//g, '').replace(/\|/g, ' or ');
      explanations.push(`URL analysis: "${patternText}"`);
      detailsForConfidence.push({ type: 'url', weight });
    }
  }
  
  // Check title-specific patterns
  for (const { pattern, weight } of titlePatterns) {
    if (pattern.test(content)) {
      suspicionScore += weight;
      const patternText = pattern.toString().replace(/\^|\$/g, '').replace(/\|/g, ' or ');
      explanations.push(`Title analysis: "${patternText}"`);
      detailsForConfidence.push({ type: 'title', weight });
    }
  }
  
  // Additional checks
  // Check for excessive punctuation
  if ((content.match(/!{2,}/g) || []).length > 1) {
    suspicionScore += 0.3;
    explanations.push('Contains excessive exclamation marks');
    detailsForConfidence.push({ type: 'punctuation', weight: 0.3 });
  }
  
  // Check for ALL CAPS sections
  if ((content.match(/\b[A-Z]{4,}\b/g) || []).length > 1) {
    suspicionScore += 0.4;
    explanations.push('Contains words in ALL CAPS (sensationalist style)');
    detailsForConfidence.push({ type: 'caps', weight: 0.4 });
  }
  
  // Calculate confidence score (0-100)
  // Transform suspicion score to confidence percentage
  // Higher suspicion = lower confidence for real news
  let confidenceScore;
  if (suspicionScore >= 0) {
    // For fake news (positive suspicion score)
    // Map from 0 to max expected suspicion (2.0) to 0-100 confidence of being fake
    confidenceScore = Math.min(Math.round((suspicionScore / 2.0) * 100), 100);
  } else {
    // For real news (negative suspicion score)
    // Map from 0 to min expected suspicion (-1.0) to 0-100 confidence of being real
    confidenceScore = Math.min(Math.round((Math.abs(suspicionScore) / 1.0) * 100), 100);
  }
  
  // Determine result based on suspicion score
  let result, explanation;
  
  if (suspicionScore >= 1.0) {
    result = 'fake';
    explanation = `High probability of fake news. ${explanations.join('. ')}`;
  } else if (suspicionScore >= 0.5) {
    result = 'fake';
    explanation = `Moderate probability of fake news. ${explanations.join('. ')}`;
  } else if (suspicionScore > 0) {
    result = 'real';
    explanation = `Likely real news with some suspicious elements. ${explanations.join('. ')}`;
  } else {
    result = 'real';
    explanation = `High probability of real news. No significant suspicious patterns detected.`;
  }
  
  return { 
    result, 
    explanation, 
    confidenceScore,
    suspicionScore: suspicionScore.toFixed(2),
    detailsForConfidence
  };
}

// In-memory storage for when MongoDB is unavailable
let inMemoryNews = [];
let isMongoAvailable = true;

// POST /api/news/detect
router.post('/detect', async (req, res) => {
  const { content, url, title, inputType = 'text' } = req.body;
  
  // Determine which input to use based on inputType
  let inputContent;
  if (inputType === 'url' && url) {
    inputContent = url;
  } else if (inputType === 'title' && title) {
    inputContent = title;
  } else if (content) {
    inputContent = content;
  } else {
    return res.status(400).json({ error: 'No valid input provided. Please provide content, url, or title based on inputType.' });
  }
  
  const detection = detectFakeNews(inputContent, inputType);
  
  try {
    // Try to save to MongoDB
    const newsItem = { 
      content: inputContent, 
      inputType,
      ...detection,
      createdAt: new Date()
    };
    
    const news = new News(newsItem);
    const savedNews = await news.save();
    res.json(savedNews);
  } catch (err) {
    console.log('MongoDB save error, using in-memory storage:', err.message);
    // If MongoDB fails, use in-memory storage
    isMongoAvailable = false;
    const newsItem = {
      _id: Date.now().toString(),
      content: inputContent,
      inputType,
      ...detection,
      createdAt: new Date()
    };
    inMemoryNews.unshift(newsItem); // Add to beginning of array
    res.json(newsItem);
  }
});

// GET /api/news
router.get('/', async (req, res) => {
  try {
    if (isMongoAvailable) {
      const newsList = await News.find().sort({ createdAt: -1 });
      res.json(newsList);
    } else {
      // Return in-memory data if MongoDB is unavailable
      res.json(inMemoryNews);
    }
  } catch (err) {
    console.log('MongoDB find error, using in-memory storage:', err.message);
    isMongoAvailable = false;
    res.json(inMemoryNews);
  }
});

module.exports = router;