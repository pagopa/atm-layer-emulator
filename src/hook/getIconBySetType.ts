import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import RoomIcon from "@mui/icons-material/Room";
import CommentIcon from "@mui/icons-material/Comment";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveIcon from "@mui/icons-material/Save";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import PagesIcon from "@mui/icons-material/Pages";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import  LaunchIcon  from "@mui/icons-material/Launch";

const Icons : { [key: string]: any } ={
	"HomeOutlined": HomeOutlinedIcon, 
	"PublishOutlined": 	PublishOutlinedIcon, 
	"VisibilityOutlined": 	VisibilityOutlinedIcon, 
	"CreateOutlined": 	CreateOutlinedIcon, 
	"PrintOutlined":  	PrintOutlinedIcon, 
	"Room":  	RoomIcon, 
	"Comment": 	CommentIcon,
	"AssessmentOutlined": 	AssessmentOutlinedIcon, 
	"AssignmentOutlined": 	AssignmentOutlinedIcon, 
	"ExpandMore": 	ExpandMoreIcon, 
	"ExpandLessOutlined": ExpandLessOutlinedIcon,
	"MenuBook": 	MenuBookIcon, 
	"ArrowForward": 	ArrowForwardIcon, 
	"ArrowForwardIos": 	ArrowForwardIosIcon, 
	"Save": 	SaveIcon, 
	"PanToolOutlined": 	PanToolOutlinedIcon, 
	"MenuBookOutlined": 	MenuBookOutlinedIcon, 
	"LibraryAddCheckOutlined": 	LibraryAddCheckOutlinedIcon, 
	"Pages": 	PagesIcon, 
	"GetAppOutlined": 	GetAppOutlinedIcon, 
	"SaveAlt": 	SaveAltIcon, 
	"PushPinOutlined": 	PushPinOutlinedIcon, 
	"MoreVertOutlined": 	MoreVertOutlinedIcon, 
	"HelpOutlineOutlined": 	HelpOutlineOutlinedIcon, 
	"Percent": 	PercentIcon, 
	"ReportProblemOutlined": 	ReportProblemOutlinedIcon, 
	"Edit": 	EditIcon, 
	"Delete": 	DeleteIcon, 
	"EditOutlined": 	EditOutlinedIcon, 
	"ImportContactsOutlined": 	ImportContactsOutlinedIcon, 
	"Search": 	SearchIcon, 
	"LowPriority": 	LowPriorityIcon, 
	"BusinessCenterOutlined": 	BusinessCenterOutlinedIcon, 
	"PersonOutline": 	PersonOutlineIcon, 
	"QuestionMarkOutlined": 	QuestionMarkOutlinedIcon, 
	"NewReleasesOutlined": 	NewReleasesOutlinedIcon, 
	"DescriptionOutlined": 	DescriptionOutlinedIcon, 
	"SearchOutlined": 	SearchOutlinedIcon, 
	"SettingsOutlined":  SettingsOutlinedIcon,
	"Cached": CachedIcon,
	"Report": ReportIcon,
	"Success" : CheckCircleIcon,
	"AccountTree": AccountTreeOutlinedIcon,
	"Description": DescriptionOutlinedIcon,
	"Widgets": WidgetsOutlinedIcon,
	"EditNote": EditNoteOutlinedIcon,
	"FileUpload": FileUploadOutlinedIcon,
	"Close": CloseIcon,
	"Launch": LaunchIcon 
};





const getIconBySetType = () => {

	const getIcon = (icon: string) => {
		if(icon  &&  Icons[icon]) {
			return Icons[icon] ;
		}else{
			return CloseIcon;
		}

	
	};

	return { getIcon };
};

export default getIconBySetType;
