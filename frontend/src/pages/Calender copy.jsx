import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, ViewDirective, Week, Resize, ExcelExport, DragAndDrop, Inject, ViewsDirective } from '@syncfusion/ej2-react-schedule';
import './excel-export.css';
import * as dataSource from './datasource.json';
/**
 *  Schedule header customization sample
 */
const ExportToExcel = () => {
    let scheduleObj = useRef(null);
    const data = extend([], dataSource.scheduleData, null, true);
    const onActionBegin = (args) => {
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick.bind(this)
            };
            args.items.push(exportItem);
        }
    };
    const onExportClick = () => {
        const exportFields = [
            { name: 'Id', text: 'Id' },
            { name: 'Subject', text: 'Summary' },
            { name: 'StartTime', text: 'Start Date' },
            { name: 'EndTime', text: 'End Date' },
            { name: 'Location', text: 'Place' }
        ];
        const exportValues = { fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
    };
    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper'>
                <ScheduleComponent cssClass='excel-export' width='100%' height='650px' id='schedule' ref={scheduleObj} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }} actionBegin={onActionBegin}>
                    <ViewsDirective>
                        <ViewDirective option='Week' />
                    </ViewsDirective>
                    <Inject services={[Week, Resize, DragAndDrop, ExcelExport]} />
                </ScheduleComponent>
            </div>
        </div>
    </div>);
};
export default ExportToExcel;