import React, { useState, useEffect } from "react";

function FilterPanel(props) {

    const handleInputChange = (e) => {
        const target = e.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        if (name === "in-person") {
            props.setInperson(value);
        }
        if (name === "virtual") {
            props.setVirtual(value);
        }
    };
    return (
        <div class="filter-wrapper">
            <form>
                <p class="filter-by">Filter By:</p>
                <div id="mode-sorting">
                    <label>
                        In-person
                        <input
                            type="checkbox"
                            id="in-person"
                            name="in-person"
                            value="in-person"
                            checked={props.inperson}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Virtual
                        <input
                            type="checkbox"
                            id="virtual"
                            name="virtual"
                            value="virtual"
                            checked={props.virtual}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div id="group-size-sorting">
                    <label>
                        Max Group Size:
                        <input
                            id="group-size"
                            type="text"
                            name="groupSize"
                            defaultValue="100"
                            onChange={(e) => {
                                props.setGroupSize(e.target.value)
                            }}
                        />
                    </label>
                </div>
                <div id="keyword-sorting">
                    <label>
                        Keyword:
                        <input
                            id="keyword"
                            type="text"
                            name="keyword"
                            size="15"
                            onChange={(e) => {
                                props.setKeyword(e.target.value)
                            }}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default FilterPanel;
