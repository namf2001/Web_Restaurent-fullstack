import { useState } from "react";
import tableApi from "../../api/tableApi";
import { setTable } from "../../redux/features/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { DeskContainer, ManagerForm } from "./components";

/** @format */
const DeskManager = () => {
    const dispatch = useDispatch();
    const tables = useSelector((state) => state.table.value);
    const [tableSelected, setTableSelected] = useState(null);
    console.log(tableSelected);

    const handleUpdate = async (e, _id) => {
        const { name, value } = e.target;
        
        const newTables = tables.map((table) => {
            if (table._id === _id) {
                return { ...table, [name]: value };
            }
            return table;
        });
        dispatch(setTable(newTables));
        setTableSelected({ ...tableSelected, [name]: value });
        try {
            await tableApi.update(_id, { [name]: value });
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="px-6">
            <div className="flex gap-4">
                <DeskContainer
                    tables={tables}
                    handleUpdate={handleUpdate}
                    setTableSelected={setTableSelected}
                />

                <ManagerForm
                    tables={tables}
                    tableSelected={tableSelected}
                    setTableSelected={setTableSelected}
                    handleUpdate={handleUpdate}
                />
            </div>
        </div>
    );
};

export default DeskManager;
