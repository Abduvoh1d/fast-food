import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { RiFileExcel2Line } from "react-icons/ri";
import {ErrorToast, InfoToast} from "@src/components/toastify/Toastify";

interface ExcelProps {
    disable?: boolean;
    className?: string;
    iconClassName?: string;
    name: string;
}

function Exel({ disable, className = 'p-3 border-2 rounded border-gray-300 mb-4', iconClassName = 'text-gray-500 text-lg' , name }: ExcelProps) {
    const handleExport = () => {
        const table = document.getElementById(name || '');
        if (table) {
            const ws = XLSX.utils.table_to_sheet(table);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Table');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${name}.xlsx`);
            InfoToast('Exel file download');
        }else {
            ErrorToast('Something went wrong in excel');
        }
    };


    return (
        <div>
            <button disabled={disable} onClick={handleExport} className={className}>
                <RiFileExcel2Line className={iconClassName} />
            </button>
        </div>
    );
}

export default Exel;
