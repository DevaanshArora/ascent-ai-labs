'use client';
import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./PolicyComponent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Select, { SingleValue } from 'react-select';
import Loading from "../loadingcomponent/loading";
import styles from './generate.module.css';
import axios from "axios";
import PolicyRenderer from './PolicyRenderer';

interface OptionType {
  value: string;
  label: string;
}

const formatPolicyData = (data: any, indentLevel: number = 0): string => {
  let formattedText = '';
  const indent = '  '.repeat(indentLevel);

  for (const key in data) {
    if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      formattedText += `\n\n${indent}${key}:\n${formatPolicyData(data[key], indentLevel + 1)}`;
    } else if (Array.isArray(data[key])) {
      formattedText += `\n\n${indent}${key}:\n${data[key].map((item: any) => `${indent}- ${item}`).join('\n')}`;
    } else {
      formattedText += `\n\n${indent}${key}: ${data[key]}`;
    }
  }

  return formattedText;
};



type SelectOption = { value: string; label: string } | null;

const orgCategories: OptionType[] = [
  { value: 'IT', label: 'IT' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Health Care', label: 'Health Care' },
];

const policyCategories: OptionType[] = [
  { value: 'HR', label: 'HR' },
  { value: 'Legal', label: 'Legal' },
  { value: 'IT', label: 'IT' },
];

const policyTypes: OptionType[] = [
  { value: 'Organisational', label: 'Organisational' },
  { value: 'Compliance', label: 'Compliance' },
  { value: 'Functional', label: 'Functional' },
];

const complianceStandards: OptionType[] = [
  { value: 'ISO 27001', label: 'ISO 27001' },
  { value: 'ISO 22301', label: 'ISO 22301' },
  { value: 'GDPR', label: 'GDPR' },
  { value: 'HIPAA', label: 'HIPAA' },
];

const locations: OptionType[] = [
  { value: 'India', label: 'India' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Riyadh, Saudi Arabia', label: 'Riyadh, Saudi Arabia' },
];

const PolicyComponent = () => {
    const [policyText, setPolicyText] = useState('');
    const [formData, setFormData] = useState<{
      organisationName: string;
      additionalInfo: string;
      organisationCategory: SelectOption;
      policyCategory: SelectOption;
      policyType: SelectOption;
      complianceStandard: SelectOption;
      location: SelectOption;
    }>({
      organisationName: '',
      additionalInfo: '',
      organisationCategory: null,
      policyCategory: null,
      policyType: null,
      complianceStandard: null,
      location: null,
    });

  const [buttonClicked, setButtonClicked] = useState(false);
  const [isGenerated, setGenerated] = useState(false);

  const handleChange = (key: string) => (value: SingleValue<OptionType> | string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  const handleChangeone = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPolicyText(e.target.value);
  };

  const renderPolicy = () => {
    try {
      const parsedPolicy = JSON.parse(policyText);
      return <PolicyRenderer policyData={parsedPolicy} />;
    } catch (error) {
      console.error('Invalid JSON:', error);
      return <p>Error displaying policy. Please check the format.</p>;
    }
  };
  

  const handleClose = () => {
    setButtonClicked(false);
    setGenerated(false);
    setFormData({
      organisationName: '',
      additionalInfo: '',
      organisationCategory: null,
      policyCategory: null,
      policyType: null,
      complianceStandard: null,
      location: null,
    });
  };

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGenerated(true);
    const form = document.querySelector('form') as HTMLFormElement;

    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data_to_send = {
        organisationName: formData['organisationName'].toString(),
        additionalInfo: formData['additionalInfo'].toString(),
        organisationCategory :formData['organisationCategory']?.value.toString() || null, 
        policyCategory : formData['policyCategory']?.value || null,
        policyType : formData['policyType']?.value || null,
        complianceStandard : formData['complianceStandard']?.value || null,
        location : formData['location']?.value || null,
    };
    
    try {
        const response = await axios.post('http://127.0.0.1:8000/generate-policy/', data_to_send);
        setGenerated(false)
        handleClose()
        console.log('Policy generated:', response.data);
        // const returned = renderPolicy(response.data)
        // const staticMarkup = ReactDOMServer.renderToStaticMarkup(returned);
        // setPolicyText(JSON.stringify(response.data, null, 2)); // Pretty print JSON
        const formattedData = formatPolicyData(response.data);
        setPolicyText(formattedData);
        // setPolicyText(staticMarkup);

    } catch (error) {
        console.error('Error generating policy:', error);
    
  }

  
};

  return (
    <div className="policy-container">
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li><i className="fas fa-home"></i>Home</li>
          <li><i className="fas fa-tasks"></i>My Task</li>
          <li><i className="fas fa-chart-line"></i>Dashboard</li>
          <li><i className="fas fa-book"></i>Policy Hub</li>
          <li><i className="fas fa-cogs"></i>Manage</li>
          <li><i className="fas fa-file-alt"></i>Reports</li>
          <li><i className="fas fa-folder"></i>Repository</li>
        </ul>
      </div>
      <div className="content">
        <header className="content-header">
        <h1>Policy Details</h1>
          <div className="header-buttons">
            <button className="btn cancel-btn">Cancel</button>
            <button className="btn save-btn">Save</button>
          </div>
        </header>
        <div className="tabs">
          <button className="tab">Basics</button>
          <button className="tab active">Policy</button>
          <button className="tab">Task</button>
          <button className="tab">Connections</button>
          <button className="tab">History</button>
        </div>
        <div className="editor-actions">
          <div className="top-buttons">
            <button className="btn upload-btn">Upload</button>
            <button className="btn download-btn">Download</button>
          </div>
          <button className="btn ai-btn" onClick={() => setButtonClicked(true)}>Generate with AI</button>
        </div>

        <div className="editor">
          <div className="editor-toolbar">
            <button className="btn"><b>B</b></button>
            <button className="btn"><i>I</i></button>
            <button className="btn"><u>U</u></button>
            <button className="btn">H1</button>
            <button className="btn">H2</button>
          </div>
          <hr />
          <textarea
            value={policyText}
            onChange={handleChangeone}
            rows={20}
            style={{ width: '100%', height:'500px' }} // Monospace font for alignment
          ></textarea>
        </div>

        <div className="footer">
          <button className="btn next-btn">Next</button>
        </div>
      </div>

      <div className={styles.body}>
        {buttonClicked && (
          <>
            <div
              className={styles.overlay}
              onClick={handleClose}
            />
            <div className={styles.container}>
              <FontAwesomeIcon 
                className={styles.x}
                icon={faX} 
                onClick={handleClose} 
              />
              <form className={styles.content}>
                <span style={{ fontSize: '30px', marginBottom: '20px', marginTop: '10px' }}>AI Policies Generation</span>
                <div className={styles.inside}>
                  <div className={styles.insideone}>
                    <label htmlFor="org">Organisation Name</label>
                    <input 
                      className={styles.input_style}
                      value={formData.organisationName}
                      onChange={(e) => handleChange('organisationName')(e.target.value)}
                      type="text"
                      required
                      placeholder="Enter organisation name"
                    />
                  </div>

                  <div className={styles.insidetwo}>
                    <label htmlFor="org_cat">Organisation Category</label>
                    <Select 
                      required
                      value={formData.organisationCategory}
                      onChange={handleChange('organisationCategory')}
                      options={orgCategories}
                      placeholder="Select organisation category"
                      isSearchable
                      styles={{ indicatorSeparator: () => ({ display: 'none' }) }}
                    />
                  </div>
                </div>
                <div className={styles.inside}>
                  <div className={styles.insideone}>
                    <label htmlFor="policy_cat">Policy Category</label>
                    <Select 
                      required
                      value={formData.policyCategory}
                      onChange={handleChange('policyCategory')}
                      options={policyCategories}
                      placeholder="Select policy category"
                      isSearchable
                      styles={{ indicatorSeparator: () => ({ display: 'none' }) }}
                    />
                  </div>

                  <div className={styles.insidetwo}>
                    <label htmlFor="policy_type">Type of Policies</label>
                    <Select 
                      required
                      value={formData.policyType}
                      onChange={handleChange('policyType')}
                      options={policyTypes}
                      placeholder="Select policy type"
                      isSearchable
                      styles={{ indicatorSeparator: () => ({ display: 'none' }) }}
                    />
                  </div>
                </div>
                <div className={styles.inside}>
                  <div className={styles.insideone}>
                    <label htmlFor="compliance_std">Compliance Standard</label>
                    <Select 
                      required
                      value={formData.complianceStandard}
                      onChange={handleChange('complianceStandard')}
                      options={complianceStandards}
                      placeholder="Select compliance standard"
                      isSearchable
                      styles={{ indicatorSeparator: () => ({ display: 'none' }) }}
                    />
                  </div>

                  <div className={styles.insidetwo}>
                    <label htmlFor="location">Location</label>
                    <Select 
                      required
                      value={formData.location}
                      onChange={handleChange('location')}
                      options={locations}
                      placeholder="Select location"
                      isSearchable
                      styles={{ indicatorSeparator: () => ({ display: 'none' }) }}
                    />
                  </div>
                </div>
                <div className={styles.inside}>
                  <div className={styles.insideone}>
                    <label htmlFor="additional_info">Additional Information</label>
                    <textarea 
                      className={styles.text_area}
                      required
                      value={formData.additionalInfo}
                      onChange={(e) => handleChange('additionalInfo')(e.target.value)}
                      placeholder="Enter additional details"
                    />
                  </div>
                </div>
                <button className={styles.generate_button} type="button" onClick={handleGenerate}>
                  Generate
                </button>
                {isGenerated && 
                  <div className={styles.spinner}>
                    <Loading />
                  </div>
                }
              </form>
            </div>
          </>
        )}
        {/* {policyText && <div  style={{ display:'flex',flexDirection:'column', overflowY:'scroll',height:'50%'}}>
          {policyText ? renderPolicy() : ''}
        </div>} */}
      </div>
    </div>
  );
};

export default PolicyComponent;