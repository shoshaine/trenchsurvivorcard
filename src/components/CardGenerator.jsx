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
          <div className="card-background-pattern"></div>
          
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="header-title-bold">TSC</div>
              <div className="header-subtitle">Trenches Survivor Card</div>
            </div>
            <div className="card-header-right">
              <div className="issued-by">Issued by <strong>TrenchCard</strong></div>
              <div className="tsc-logo-circle">
                <span>TSC</span>
                <span className="small">CARDS</span>
              </div>
            </div>
          </div>

          <div className="card-main-content">
            <div className="card-photo-section">
              <div className="photo-frame">
                {image ? (
                  <img src={image} alt="Survivor" />
                ) : (
                  <div className="placeholder-image">PHOTO</div>
                )}
              </div>
            </div>

            <div className="card-details-section">
              <div className="field-group">
                <label>Name</label>
                <div className="field-value name-value">{name || 'Trench Card'}</div>
              </div>

              <div className="field-group">
                <label>DoB (Date of Bagholding)</label>
                <div className="field-value">25 Dec 2025</div>
              </div>

              <div className="field-group">
                <label>PnL / Status</label>
                <div className={`field-value pnl-value ${pnl.includes('-') ? 'rekt' : 'moon'}`}>
                  {pnl || 'SURVIVING'}
                </div>
              </div>

              <div className="field-group">
                <label>Expires on</label>
                <div className="field-value">31 Dec 2026</div>
              </div>
            </div>

            <div className="card-hologram-section">
              <div className="hologram-patch">
                <span>PASS</span>
              </div>
            </div>
          </div>

          <div className="card-bottom-row">
            <div className="card-number">
              5843 6795 0100 {Math.floor(Math.random() * 9000) + 1000}
            </div>
          </div>

          <div className="card-footer-row">
            <div className="footer-logo">
              <div className="footer-logo-bold">TSC</div>
              <div className="footer-logo-text">Trenches Survivor Card</div>
            </div>
            <div className="footer-year">2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
