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
        if (name === "most-recent") {
            props.setMostRecent(value);
        }
        if (name === "alphabetical") {
            props.setAlphabetical(value);
        }
    };

    return (
        <div class="filter-wrapper">
            <form>
                <p class="filter-by">Filter By:</p>
                <div id="filter-by-panel">
                    <div>
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
                    </div>
                    <div>
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
                    <div>
                        <label>
                            <p>Max Group Size</p>
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
                    <div>
                        <label>
                            Keyword
                            <input
                                id="keyword"
                                type="text"
                                name="keyword"
                                size="15"
                                placeholder="Ex: shopping"
                                onChange={(e) => {
                                    props.setKeyword(e.target.value)
                                }}
                            />
                        </label>
                    </div>
                </div>
                <br />
                <p className="sort-by">Sort By:</p>
                <div id="sort-by-panel">
                    <div>
                        <label>
                            Upcoming
                            <input
                                type="checkbox"
                                id="most-recent"
                                name="most-recent"
                                value="most-recent"
                                checked={props.mostRecent}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Alphabetical
                            <input
                                type="checkbox"
                                id="alphabetical"
                                name="alphabetical"
                                value="alphabetical"
                                checked={props.alphabetical}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FilterPanel;
