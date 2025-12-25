import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './CardGenerator.css';

const CardGenerator = () => {
  const [name, setName] = useState('');
  const [pnl, setPnl] = useState('');
  const [image, setImage] = useState(null);
  const cardRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2 // Higher resolution
      });
      const link = document.createElement('a');
      link.download = `trenches-survivor-${name || 'anon'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="generator-container">
      <div className="form-section">
        <h2>Identity Verification</h2>
        <div className="input-group">
          <label>Survivor Name</label>
          <input 
            type="text" 
            placeholder="e.g. Diamond Hands Dave" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        
        <div className="input-group">
          <label>2025 PnL (Profit/Loss)</label>
          <input 
            type="text" 
            placeholder="e.g. -99% or +10000%" 
            value={pnl} 
            onChange={(e) => setPnl(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label>Profile Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </div>

        <button onClick={handleDownload} className="download-btn">
          Mint Card (Download)
        </button>
      </div>

      <div className="preview-section">
        <div className="card-wrapper" ref={cardRef}>
          <div className="card-header">
            <div className="official-seal">OFFICIAL</div>
            <div className="card-title">TRENCHES SURVIVOR PASS</div>
            <div className="year-badge">2025</div>
          </div>
          
          <div className="card-body">
            <div className="image-container">
              {image ? (
                <img src={image} alt="Survivor" />
              ) : (
                <div className="placeholder-image">NO IMAGE</div>
              )}
              <div className="verified-badge">✓ VERIFIED REKT</div>
            </div>
            
            <div className="details-container">
              <div className="detail-row">
                <span className="label">NAME:</span>
                <span className="value">{name || 'ANONYMOUS'}</span>
              </div>
              <div className="detail-row">
                <span className="label">STATUS:</span>
                <span className="value status-active">SURVIVING</span>
              </div>
              <div className="detail-row">
                <span className="label">2025 PnL:</span>
                <span className={`value pnl-value ${pnl.includes('-') ? 'rekt' : 'moon'}`}>
                  {pnl || '0%'}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">ID:</span>
                <span className="value code">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <p>"I survived the 2025 trenches and all I got was this card"</p>
            <div className="barcode">||| || ||| | |||| |||</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
