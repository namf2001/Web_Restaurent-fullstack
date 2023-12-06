import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, ExcelExport } from '@syncfusion/ej2-react-schedule';
import reservationApi from '../api/reservationApi';

const Calender = () => {
    let scheduleObj = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getScheduleData = async () => {
            try {
                const res = await reservationApi.getAll();
                const modifiedData = res.map(item => {
                    const startTime = new Date(item.date);
                    const endTime = new Date(startTime);
                    endTime.setHours(startTime.getHours() + 1);
                    return {
                        Id: item._id,
                        Subject: `Tên khách hàng:${item.user_name}`,
                        Location: 'Hà Nội',
                        StartTime: startTime.toISOString(),
                        EndTime: endTime.toISOString(),
                        CategoryColor: '#EA736D',
                        Description: `số điện thoại:${item.phone}| Số người${item.guests}| ${item.note}`,
                    };
                });
                setData(modifiedData);
            } catch (error) {
                console.log(error);
            }
        };
        getScheduleData();
    }, []);


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
            { name: 'Location', text: 'Place' },
            { name: 'Description', text: 'Description' }
        ];
        const exportValues = { fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
    };

    return (
        <div className="px-6 rounded-3xl overflow-hidden">
            <ScheduleComponent cssClass='excel-export rounded-3xl' width='100%' height='650px' id='schedule' ref={scheduleObj} selectedDate={new Date()} eventSettings={{ dataSource: data }} actionBegin={onActionBegin}>
                <ViewsDirective>
                    {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, ExcelExport]} />
            </ScheduleComponent>
        </div>
    );
};

export default Calender;
