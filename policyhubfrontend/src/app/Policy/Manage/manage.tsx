

'use client';
import { useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styles from './manage.module.css';
import { FiHome } from "react-icons/fi";
import { SiFusionauth } from "react-icons/si";
import { SiQuasar } from "react-icons/si";
import { GoShield } from "react-icons/go";
import { PiQuestionFill } from "react-icons/pi";
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";
import { LuDatabase } from "react-icons/lu";
import { GrDocumentPerformance } from "react-icons/gr";
import { FiHardDrive } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf } from "react-icons/pi";
import { PiFileXls } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { VscListFilter } from "react-icons/vsc";
import { CgBorderStyleSolid } from "react-icons/cg";
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper,Checkbox,IconButton,} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import axios from 'axios';

interface Policy {
  id: number;
  description: string;
  name: string;
  category: string;
  department: string;
  owner: string;
}



const Manag: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [sortedData, setSortedData] = useState<Policy[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/policies/details/");
        const mappedData = response.data.map((policy: any[]) => ({
          id: policy[0],
          description: policy[1],
          name: policy[2],
          category: policy[3],
          department: policy[4],
          owner: policy[5],
        }));
        setPolicies(mappedData);
        setSortedData(mappedData);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);

  const handleSort = (column: keyof Policy) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setSortedData(sorted);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = policies.filter((policy) =>
      policy.name.toLowerCase().includes(value)
    );
    setSortedData(filtered);
  };

  // const data = [
  //   { id: 'ORG_IND_HR_v.0.1', name: 'Information Security Policy', version: '0.1', category: 'Organizational', department: 'Edward', owner: 'Ritibha', status: 'Approved' },
  //   { id: 'ORG_IND_HR_v.0.1', name: 'Flexibility Policy', version: '0.2', category: 'Compliance', department: 'HR', owner: 'Sajid', status: 'Approved' },
  //   { id: 'ORG_IND_HR_v.0.2', name: 'IT Security and Data', version: '0.1', category: 'Corporate', department: 'HR', owner: 'Sashi', status: 'Reject' },
  //   { id: 'ORG_IND_HR_v.0.2', name: 'Protection Policy', version: '0.1', category: 'Compliance', department: 'HR', owner: 'Ritibha', status: 'Draft' },
  //   { id: 'ORG_IND_HR_v.0.1', name: 'Information Security Policy', version: '0.1', category: 'Organizational', department: 'Edward', owner: 'Ritibha', status: 'Approved' },
  //   { id: 'ORG_IND_HR_v.0.1', name: 'Flexibility Policy', version: '0.2', category: 'Compliance', department: 'HR', owner: 'Sajid', status: 'Approved' },
  //   { id: 'ORG_IND_HR_v.0.2', name: 'IT Security and Data', version: '0.1', category: 'Corporate', department: 'HR', owner: 'Sashi', status: 'Reject' },
  //   { id: 'ORG_IND_HR_v.0.2', name: 'Protection Policy', version: '0.1', category: 'Compliance', department: 'HR', owner: 'Ritibha', status: 'Draft' },
  // ];

  // const sortedData = [...data].sort((a, b) => {
  //   if (sortField) {
  //     const aValue = a[sortField as keyof typeof a];
  //     const bValue = b[sortField as keyof typeof b];

  //     if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
  //     if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
  //   }
  //   return 0;
  // });
  
  const handleNewbutton = () => {
    router.push('./Policy/PolicyComponent');
  };

  const policy = {
    title: "Approved Policies",
    count: 23,
  };

  const policy1 = {
    title1: "Missing Policies",
    count1: 23,
    title4: "Validate Missing Polices"
  };

  const policy2 = {
    title2: "Overdue Policies",
    count2: 23,
  };

  const policy3 = {
    title3: "Pending Policies",
    count3: 23,
  };
  
  return (
    <div className={styles.grayBackgroundContainer}>
      <div className={styles.managecontainer1}>
        <div className={styles.managecontainer}>
            <div className={styles.managepicturesection}>
              <div className={styles.managepicture}></div>
              <div className={styles.managelogo}>GRC</div>
              <button className={styles.managebutton} onClick={toggleDropdown}>
                  <span className={styles.policycolor}>Policies</span>
                  <span className={styles.managearrow}></span>
              </button>
            </div>
            <nav className={`${styles.managenavLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
              <div className={styles.managenavIcons}>
                  <SettingsIcon className={styles.manageseticon} />
                  <NotificationsIcon className={styles.managenoticon} />
                  <AiOutlineAppstore className={styles.manageappicon} />
                  <span className={styles.manageascendName}>Ascent</span>
              </div>
            </nav>
        </div>
      </div>
      <div className={styles.sidebar}>
        <nav className={styles.menu}>
            <ul>
            <li>
                <a href="#" className={styles.link}>
                  <i className={styles.iconhome}><FiHome /></i>
                  <span>Home</span>
                </a>
            </li>
            <li>
                <a href="#" className={styles.task}>
                <i className={styles.icontask}><SiFusionauth/> </i> 
                <span>My Task</span>
                </a>
            </li>
            <li className={styles.sectionheader}>POLICY</li>
            <li>
                <a href="#" className={styles.dash}>
                <i className={styles.icondashboard}><AiOutlineAppstore/></i> 
                <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#" className={styles.program}>
                <i className={styles.iconprogram}><AiOutlineBars/></i> 
                <span>Policy Hub</span>
                </a>
            </li>
            <li>
                <a href="#" className={styles.iconmanage}>
                <i className={styles.iconmanage1}><LuDatabase/></i> 
                <span>Manage</span>
                </a>
            </li>
            <li>
                <a href="#" className={styles.reporticon}>
                <i className={styles.iconreport}><GrDocumentPerformance/></i> 
                <span>Reports</span>
                </a>
            </li>
            <li>
              <a href="#" className={styles.repository}>
                <i className={styles.iconrepository}><FiHardDrive/></i> 
                <span>Repository</span>
              </a>
            </li>
            </ul>
        </nav>
      </div>

      <div className={styles.boxmainsidebar}>
        <span>Policy</span>
        <div className={styles.boxpolicysidebar}>
          <div className={styles.approvedheader}>
            <div className={styles.headerStyle}>
              <h3 className={styles.titleStyle}>{policy.title}</h3>
              <i className={styles.approvedpolicies}><PiQuestionFill/></i>
            </div>
            <div className={styles.countStyle}>{policy.count}</div>
          </div>

          <div className={styles.missingheader}>
            <div className={styles.missingheaderStyle}>
              <h3 className={styles.missingtitleStyle}>{policy1.title1}</h3>
              <i className={styles.missingpolicies}><PiQuestionFill/></i>
            </div>
            <div className={styles.missingheaderpolicy}>
              <i className={styles.missingpolicies1}><GoShield/></i>
              <div className={styles.validatecountStyle}>{policy1.title4}</div>
              <div className={styles.missingcountStyle}>{policy1.count1}</div>
            </div>
          </div>

          <div className={styles.overdueheader}>
            <div className={styles.overdueheaderStyle}>
              <h3 className={styles.overduetitleStyle}>{policy2.title2}</h3>
              <i className={styles.overduepolicies}><PiQuestionFill/></i>
            </div>
            <div className={styles.overduecountStyle}>{policy2.count2}</div>
          </div>

          <div className={styles.pendingheader}>
            <div className={styles.pendingheaderStyle}>
              <h3 className={styles.pendingtitleStyle}>{policy3.title3}</h3>
              <i className={styles.pendingpolicies}><PiQuestionFill/></i>
            </div>
            <div className={styles.pendingcountStyle}>{policy3.count3}</div>
          </div>
        </div>

        <div className={styles.bulkactionpolicy}>
          <div className={styles.bulkactionbuttionfolder}>
            <div className={styles.bulkactiobutton1}>
              <button className={styles.button}>Bulk Action <IoIosArrowDown/></button>
              <button className={styles.applybutton}>Apply</button>
              <span className={styles.exportlabel}>Export</span>
              <div className={styles.iconreportxlsbox}>
                <i className={styles.iconreportxls}><PiFileXls/></i> 
              </div>
              <div className={styles.iconreportpdfbox}>
                <i className={styles.iconreportpdf}><PiFilePdf/></i> 
              </div>
            </div>
            <div className={styles.searchparentnodecontainer} >
              <div className={styles.searchparentnode} >
                <div className={styles.searchinput}>
                    <i className={styles.searchicon}><IoIosSearch/></i>
                    <div><input className={styles.searchlabel} type="text" placeholder="Search" value={searchValue} onChange={handleSearch} /></div>
                </div>
              </div>
              <div className={styles.searchthreeline}>
                  <i className={styles.cancelsearchicon1}><VscListFilter/></i>
              </div>
              <i className={styles.cancelsearchicon2}><IoSettingsOutline/></i>
              <i className={styles.cancelsearchicon3}><CgBorderStyleSolid/></i>
              <button className={styles.newbutton}  onClick={handleNewbutton} >New<IoIosArrowDown/></button>
            </div>
          </div>


          <div className={styles.policytable}>
            <TableContainer component={Paper} style={{ borderRadius: '8px', height: '100%', overflowY: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#f4f4f4' }}>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    {['Policy ID', 'Policy Name', 'Category', 'Department', 'Policy Owner'].map((header, index) => (
                      <TableCell
                        key={index}
                        style={{ fontWeight: 600, whiteSpace: 'nowrap', textAlign: 'left' }}
                      >
                        <div
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <span>{header}</span>
                          <div>
                            <IconButton
                              size="small"
                              style={{ padding: '0', margin: '0' }}
                              onClick={() =>
                                handleSort(
                                  header.toLowerCase().replace(/\s+/g, '') as keyof Policy
                                )
                              }
                            >
                              <ArrowUpward fontSize="small" />
                              <ArrowDownward fontSize="small" />
                            </IconButton>
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox size="small" />
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={styles.arrowbuttionfolder}>
            <div className={styles.arrowsbutton}>
              <button className={styles.twoarrowbutton}><BiChevronsLeft/></button>
              <button className={styles.onearrowbutton}><BiChevronLeft/></button>
              <button className={styles.fourarrowbutton}><BiChevronRight/></button>
              <button className={styles.threearrowbutton1}><BiChevronsRight/></button>
            </div>
            <div className={styles.pagesbutton}>
              <span className={styles.pagerows}>Rows Per Page</span>
              <button className={styles.pagebutton}>25 <IoIosArrowDown/></button>
              <span className={styles.pagerows1of1}>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Manag;


