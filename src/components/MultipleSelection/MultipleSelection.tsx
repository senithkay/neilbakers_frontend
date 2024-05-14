import React, { useState } from "react";
import Select, { ValueType } from "react-select";

interface Option {
    value: string;
    label: string;
}

const options: Option[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const MultiSelection: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    
    const handleChange = (selectedOptions: ValueType<Option, true>) => {
        setSelectedOptions(selectedOptions as Option[]);
    };

    return (
        <Select
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            isMulti
        />
    );
};

export default MultiSelection;
