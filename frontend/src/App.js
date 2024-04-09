import React, { useState } from 'react';
import axios from 'axios';

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="image" />;
};

interface OutputProps {
  text: string;
  imageUrl: string;
}

const Output: React.FC<OutputProps> = ({ text, imageUrl }) => {
  return (
    <div className="output">
      <div className="output-content">
        <div className="output-text">
          <pre className="output-placeholder">{text}</pre>
        </div>
        <div className="output-image">
          <Image src={imageUrl} alt="Output image" />
        </div>
      </div>
    </div>
  );
};

const MyComponent: React.FC = () => {
  const [command, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmitClick = async () => {
    try {
      console.log('Command:', command); // Log the command before sending the request
      const response = await axios.post('http://192.168.1.12:5000/api/run-command', { command });
      setOutputText(response.data.output);
    } catch (error) {
      console.error('Error running command:', error);
    }
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="header-text">Input your command here</div>
          <textarea
            className="input-placeholder"
            value={command}
            onChange={handleInputChange}
            rows={4}
          />
        </header>
        <button className="submit-button" onClick={handleSubmitClick}>
          Submit
        </button>
        <h2 className="output-heading">Output:</h2>
        <Output text={outputText} imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/004e25d4d2a8767bcee929d7b1c1ec5f51f73a22a2b362c7cb5c4336ac1f344a?apiKey=3357d2c5df864358aff2e2b80c2a0846&" />
      </div>
      <style jsx>{`
        .container {
          background-color: #f98f8f;
          display: flex;
          max-width: 693px;
          flex-direction: column;
          padding: 18px 25px;
        }

        @media (max-width: 991px) {
          .container {
            padding: 18px 20px;
          }
        }

        .header {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          font-weight: 700;
        }

        @media (max-width: 991px) {
          .header {
            margin-right: 6px;
            flex-wrap: wrap;
          }
        }

        .header-text {
          color: #fff;
          align-self: start;
          font: 12px Inter, sans-serif;
        }

        .input-placeholder {
          background-color: #d9d9d9;
          width: 490px;
          max-width: 100%;
          height: auto;
          border: none;
          padding: 10px;
          font-size: 16px;
          resize: vertical;
        }

        .submit-button {
          all: unset;
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 20px;
          appearance: none;
          background-color: #d9d9d9;
          color: rgba(0, 0, 0, 1);
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          font-weight: 600;
          padding: 15px 25px;
        }

        .output-heading {
          color: #fff;
          margin-top: 31px;
          font: 700 12px Inter, sans-serif;
        }

        @media (max-width: 991px) {
          .output-heading {
            max-width: 100%;
          }
        }

        .output {
          margin-top: 15px;
        }

        @media (max-width: 991px) {
          .output {
            max-width: 100%;
          }
        }

        .output-content {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .output-content {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .output-text {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 64%;
          margin-left: 0px;
        }

        @media (max-width: 991px) {
          .output-text {
            width: 100%;
          }
        }

        .output-placeholder {
          background-color: #6f5e5e;
          width: 405px;
          max-width: 100%;
          height: 198px;
          margin: 0 auto;
          padding: 10px;
          color: #fff;
          font-size: 16px;
          overflow-y: auto;
          white-space: pre-wrap;
        }

        @media (max-width: 991px) {
          .output-placeholder {
            margin-top: 15px;
          }
        }

        .output-image {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 36%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .output-image {
            width: 100%;
          }
        }

        .image {
          aspect-ratio: 1.41;
          object-fit: auto;
          object-position: center;
          width: 100%;
          align-self: stretch;
          margin: auto 0;
        }

        @media (max-width: 991px) {
          .image {
            margin-top: 33px;
          }
        }
      `}</style>
    </>
  );
};

export default MyComponent;
