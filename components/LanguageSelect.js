import { languages } from './Languages';
import Select from 'react-select';

const LanguageSelect = ({ language, handleLanguageChange, disabled }) => {
    
    const formatOptionLabel = ({ label }) => (
        <div className='flex flex-row justify-between items-center'>
            <p>{label}</p>
            {language === label && <p className='text-xs text-slate-400'>Select</p>}
        </div>
    );
    
    return (
        <Select
            className="w-full rounded-t-lg border-2 border-black"
            value={{ label: language, value: language }}
            onChange={handleLanguageChange}
            isDisabled={disabled}
            options={languages.sort((a, b) => (a.label || "").localeCompare(b.label || ""))}
            formatOptionLabel={formatOptionLabel}
        />
    );
};

export default LanguageSelect;
