'use client';
import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./PolicyComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Select, { SingleValue }  from 'react-select';
import Loading from "../loadingcomponent/loading";
import styles from '../Generate/generate.module.css'

interface OptionType {
  value: string;
  label: string;
}



const PolicyComponent =() => {
const [buttonClicked,setButtonClicked]= useState('not clicked');
    const [organisationName, setOrganisationName] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [organisationCategory, setOrganisationCat] = useState<SingleValue<OptionType>>(null);
    const [policyCategory, setPolicyCategory] = useState<SingleValue<OptionType>>(null);
    const [policyType, setPolicyType] = useState<SingleValue<OptionType>>(null);
    const [complianceStandard, setComplianceStandard] = useState<SingleValue<OptionType>>(null);
    const [location, setLocation] = useState<SingleValue<OptionType>>(null);
    const [isGenerated, setGenerated] = useState('not generated');


    const org_category: OptionType[] = [
        { value: 'IT', label: 'IT' },
        { value: 'Manufacturing', label: 'Manufacturing' },
        { value: 'Health Care', label: 'Health Care' },
    ];

    const policy_cat: OptionType[] = [
        {value: 'HR', label:'HR'},
        {value:'Legal', label:'Legal'},
        {value:'IT', label:'IT'},
    ]

    const policy_types: OptionType[] = [
        {value:'Organisational', label:'Organisational'},
        {value:'Compliance', label:'Compliance'},
        {value:'Functional', label:'Functional'}
    ]


    const compliance_std: OptionType[] = [
        {value:'ISO 27001', label:'ISO 27001'},
        {value:'ISO 22301', label:'ISO 22301'},
        {value:'GDPR', label:'GDPR'},
        {value:'HIPAA', label:'HIPAA'},
        
    ]


    const location_opt: OptionType[] = [
        {value:'India', label:'India'},
        {value:'Singapore', label:'Singapore'},
        {value:'Riyadh, Saudi Arabia',label:'Riyadh, Saudi Arabia'}
    ]

    const handleOrgName = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setOrganisationName(event.target.value);
    }

    const handleAdditionalInfo = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setAdditionalInfo(event.target.value);
    }

    const handleOrgCat = (option: SingleValue<OptionType>) => {
        setOrganisationCat(option);
    }

    const handlePolicyCategory = (option: SingleValue<OptionType>) => {
        setPolicyCategory(option);
    }

    const handlePolicyType = (option: SingleValue<OptionType>) => {
        setPolicyType(option);
    }

    const handleCompliancestd = (option: SingleValue<OptionType>) => {
        setComplianceStandard(option);
    }
    
    const handleLocation = (option: SingleValue<OptionType>) => {
        setLocation(option);
    }

    const handleClose = ()=>{
        setButtonClicked('not clicked');
        setGenerated('not generated');
        setComplianceStandard(null)
        setAdditionalInfo('');
        setOrganisationCat(null);
        setPolicyCategory(null);
        setPolicyType(null);
        setLocation(null);
        setOrganisationName('');
    }

    const handleGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        const form = document.querySelector('form') as HTMLFormElement;
    
        if (form && !form.checkValidity()) {
            form.reportValidity(); // Highlight invalid fields and display validation messages.
            return;
        }
    
        console.log('Form submitted successfully!');
        console.log({
            organisationName,
            additionalInfo,
            organisationCategory,
            policyCategory,
            policyType,
            complianceStandard,
            location,
        });
        setGenerated('generated');
    };
  
    return (
        <div className="policy-container">
          <div className="sidebar">
            <ul className="sidebar-menu">
              <li><i className="fas fa-home"></i>Home</li>
              <li> <i className="fas fa-tasks"></i>My Task</li>
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
              <button className="tab ">Basics</button>
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
              <button className="btn ai-btn" onClick={()=>{setButtonClicked('clicked')}}>Generate with AI</button>
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
              <textarea placeholder="Add some text"></textarea>
            </div>
            
            <div className="footer">
              <button className="btn next-btn">Next</button>
              {/* <select>
                <option>English(UK)</option>
                {/* Add more languages if needed */}
              {/* </select> */} 
            </div>
          </div>

          <div className={styles.body}>
            {buttonClicked === 'clicked' && (
                <>
                    <div 
                        className={styles.overlay} 
                        onClick={() => setButtonClicked('not clicked')}
                    />
                    <div className={styles.container}>
                        <FontAwesomeIcon 
                            className={styles.x}
                            icon={faX} 
                            onClick={handleClose} 
                        />
                        <form className={styles.content} >
                            <span style={{ fontSize:'30px', marginBottom:'20px', marginTop:'10px' }}>AI Policies Generation</span>
                            <div className={styles.inside}>
                                <div className={styles.insideone}>
                                    <label htmlFor="org">Organisation Name</label>
                                    <input 
                                    className={styles.input_style}
                                    value={organisationName}
                                    onChange={handleOrgName}
                                    type="text"
                                    required
                                    placeholder="Enter organisation name"
                                     />
                                </div>

                                <div className={styles.insidetwo}>
                                    <label htmlFor="org_cat">Organisation Category</label>
                                    <Select 
                                        required
                                        value={organisationCategory}
                                        onChange={handleOrgCat}
                                        options={org_category}
                                        placeholder="Select organisation category"
                                        isSearchable
                                        styles={{
                                            indicatorSeparator:()=>({
                                                display:'none'
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.inside}>
                                <div className={styles.insideone}>
                                    <label htmlFor="org">Policy Category</label>
                                    <Select 
                                        required
                                        value={policyCategory}
                                        onChange={handlePolicyCategory}
                                        options={policy_cat}
                                        placeholder="Select policy category"
                                        isSearchable
                                        styles={{
                                            indicatorSeparator:()=>({
                                                display:'none'
                                            })
                                        }}
                                    />
                                </div>

                                <div className={styles.insidetwo}>
                                    <label htmlFor="org_cat">Type of Policies</label>
                                    <Select 
                                        required
                                        value={policyType}
                                        onChange={handlePolicyType}
                                        options={policy_types}
                                        placeholder="Select policy type"
                                        isSearchable
                                        styles={{
                                            indicatorSeparator:()=>({
                                                display:'none'
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.inside}>
                                <div className={styles.insideone}>
                                    <label htmlFor="org">Compliance Standard</label>
                                    <Select 
                                        required
                                        value={complianceStandard}
                                        onChange={handleCompliancestd}
                                        options={compliance_std}
                                        placeholder="Select compliance standard"
                                        isSearchable
                                        styles={{
                                            indicatorSeparator:()=>({
                                                display:'none'
                                            })
                                        }}
                                    />
                                </div>

                                <div className={styles.insidetwo}>
                                    <label htmlFor="org_cat">Location</label>
                                    <Select 
                                        required
                                        value={location}
                                        onChange={handleLocation}
                                        options={location_opt}
                                        placeholder="Select location"
                                        isSearchable
                                        styles={{
                                            indicatorSeparator:()=>({
                                                display:'none'
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.inside}>
                                <div className={styles.insideone}>
                                    <label htmlFor="org">Additional Information</label>
                                    <textarea 
                                    className={styles.text_area}
                                        required
                                        value={additionalInfo}
                                        onChange={handleAdditionalInfo}
                                        placeholder="Enter additional details">
                                    </textarea>
                                </div>
                            </div>
                            {/* <div className={styles.generate_button} > */}
                            <button className={styles.generate_button} type="button" onClick={handleGenerate}>
                                Generate
                            </button>
                            {/* </div> */}
                            { isGenerated == 'generated' && 
                        <div className={styles.spinner}>
                            <Loading/>
                        </div> }
                        </form>
                      
                        
                    </div>
                    
                </>
            )}
            
          </div>

          
        </div>
      );
    };

export default PolicyComponent;