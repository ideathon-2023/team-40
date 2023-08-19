import { useState } from 'react';

const Dropdown = ({ handleBranch }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className='dropdown'>
            <select required name="branch" id="branch">
                <option disabled selected>Select Your Branch</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="aerospace">Aerospace</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="bdesign">B. Design</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="civil">Civil</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="cs">CSE</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="ds">CSE (DS)</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="ai">CSE (AI)</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="ece">ECE</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="vlsi">ECE (VLSI)</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="ee">EE</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="mech">Mechanical</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="metta">Mettalurgy</option>
                <option onClick={(e) => { setSelectedItem(e.target.value); handleBranch(e.target.value); }} value="prod">Production</option>
            </select>
        </div>
    )
}

export default Dropdown;
