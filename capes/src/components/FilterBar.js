import React, { useState, useEffect } from "react";
import "@govbr-ds/webcomponents/dist/webcomponents.umd.min.js";

function FilterBar({
    worksData,
    applyFilters,
    searchPerformed,
    isShowingFilters,
}) {
    const [availableTypes, setAvailableTypes] = useState({});
    const [availableEditors, setAvailableEditors] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [availableAreas, setAvailableAreas] = useState({});
    const [oldestDate, setOldestDate] = useState(null);
    const [newestDate, setNewestDate] = useState(null);
    const [OACount, setOA] = useState(0);
    const [noOACount, setNoOA] = useState(0);

    const [openAccessOnly, setOpenAccessOnly] = useState([""]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [yearRange, setYearRange] = useState([2000, 2024]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedEditors, setSelectedEditors] = useState([]);

    useEffect(() => {
        if (searchPerformed) {
            handleFilters();
        }
        // Atualiza os filtros quando há uma nova pesquisa
    }, [worksData, searchPerformed]);

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleFilters = async () => {
        // Contagem de tipos
        const typeCounts = {};
        worksData.forEach((work) => {
            if (work.type) {
                const type = work.type;
                typeCounts[type] = (typeCounts[type] || 0) + 1;
            }
        });
        setAvailableTypes(typeCounts);

        // Contagem de idiomas
        const languageCounts = {};
        worksData.forEach((work) => {
            if (work.language) {
                const language = work.language;
                languageCounts[language] = (languageCounts[language] || 0) + 1;
            }
        });
        setAvailableLanguages(languageCounts);

        // Contagem de áreas
        const areasCount = {};
        worksData.forEach((work) => {
            const area = work.concepts[0].display_name;
            areasCount[area] = (areasCount[area] || 0) + 1;
        });
        setAvailableAreas(areasCount);

        // Contagem de editores
        const editorsCount = {};
        worksData.forEach((work) => {
            const editor =
                work.authorships[0]?.institutions[0]?.display_name || "unknown";
            editorsCount[editor] = (editorsCount[editor] || 0) + 1;
        });
        setAvailableEditors(editorsCount);

        // Obter ano de publicação mais novo e mais antigo
        const publicationYears = worksData
            .map((work) => work.publication_year)
            .filter(Boolean);
        if (publicationYears.length > 0) {
            setNewestDate(Math.max(...publicationYears));
            setOldestDate(Math.min(...publicationYears));
        }

        let isOACount = 0;
        let notOACount = 0;

        worksData.forEach((work) => {
            const is_oa = work.is_oa;
            if (is_oa) {
                isOACount++;
            } else {
                notOACount++;
            }
        });

        setNoOA(notOACount);
        setOA(isOACount);
    };

    const applySelectedFilters = () => {
        let filteredWorks = [...worksData];

        // Aplica os filtros com base nas seleções
        if (openAccessOnly) {
            filteredWorks = filteredWorks.filter((work) => work.is_oa);
        }

        // Filtros de tipo
        if (selectedTypes.length > 0) {
            filteredWorks = filteredWorks.filter((work) =>
                selectedTypes.includes(work.type)
            );
        }

        // Filtros de áreas
        if (selectedAreas.length > 0) {
            filteredWorks = filteredWorks.filter((work) =>
                selectedAreas.includes(work.concepts[0]?.display_name)
            );
        }
        // Chama a função para atualizar os works na SearchBar
        applyFilters(filteredWorks);
    };

    return (
        <div class="retangulo">
                <div className="filter">
                    <br-list title="" data-toggle="true" density="small">
                        <br-item title="Definições" style={{ background: "#F8F8F8", borderRadius: '8px', marginBottom: '8px' }}>

                            <br-list style={{ background: "#F8F8F8", marginLeft: '12px', marginBottom: '12px', marginRight: '12px'}}>
                                <br-switch style={{ background: "#F8F8F8"}} label="Acesso Aberto" id label-checked="" label-not-checked=""></br-switch>
                                <br-switch style={{ background: "#F8F8F8"}} label="Produção Nacional" id label-checked="" label-not-checked=""></br-switch>
                                <br-switch style={{ background: "#F8F8F8"}} label="Revisão por Pares" id label-checked="" label-not-checked=""></br-switch>
                            </br-list>

                        </br-item>

                        <br-item title="Ano de Publicação" style={{ background: "#F8F8F8", borderRadius: '8px', marginBottom: '8px' }}>
                            <br-list style={{ background: "#F8F8F8", marginLeft: '12px', marginBottom: '12px', marginRight: '12px'}}>
                                <br-input
                                icon="calendar"
                                    label="De"
                                    placeholder={oldestDate}
                                    density="small"
                                ></br-input>
                                <br-input
                                icon="calendar"
                                    label="Até"
                                    placeholder={newestDate}
                                    density="small"
                                ></br-input>

                            </br-list>
                        </br-item>

                        <br-item title="Áreas" style={{ background: "#F8F8F8", borderRadius: '8px', marginBottom: '8px' }}>
                            <br-list style={{ background: "#F8F8F8", marginLeft: '12px', marginBottom: '12px', marginRight: '12px'}}>
                                <br-input icon-sign="search" label="" placeholder="Busca"></br-input>
                                <br-checkbox style={{ background: "#F8F8F8", paddingTop: '8px'}}
                                    label="Ciências Humanas"
                                    name="base"
                                    aria-label=""
                                    model="check1"
                                ></br-checkbox>
                                <br-checkbox style={{ background: "#F8F8F8", paddingTop: '8px' }}
                                    label="Ciências Exatas"
                                    name="base"
                                    aria-label=""
                                    model="check1"
                                ></br-checkbox>
                                <br-checkbox style={{ background: "#F8F8F8", paddingTop: '8px' }}
                                    label="Ciências Biológicas"
                                    name="base"
                                    aria-label=""
                                    model="check1"
                                ></br-checkbox>
                                <br-button>Mostrar mais</br-button>
                            </br-list>
                        </br-item>
                    </br-list>

                    <br-button style={{width: "220px"}} type="primary">Filtrar</br-button>

                    {/*
          <div>
            <strong>Acesso Aberto</strong>
          </div>

          <label>
            <input
              type="checkbox"
              checked={openAccessOnly === "yes"}
              onChange={() =>
                setOpenAccessOnly(openAccessOnly === "" ? "yes" : "")
              }
            />
            Sim
          </label>
          <label>
            <input
              type="checkbox"
              checked={openAccessOnly === "no"}
              onChange={() =>
                setOpenAccessOnly(openAccessOnly === "" ? "no" : "")
              }
            />
            Não
          </label>

          <div>
            <h4>Type</h4>
            <div className="multi-select">
              {Object.entries(availableTypes).map((type) => (
                <label key={type[0]}>
                  <input
                    type="checkbox"
                    value={type[0]}
                    checked={selectedTypes.includes(type[0])}
                    onChange={() => handleTypeChange(type[0])}
                  />
                  {type[0]}({type[1]})
                </label>
              ))}
            </div>

                        <div>
                            <h4>Languages</h4>
                            <div className="multi-select">
                                {Object.entries(availableLanguages).map((lang) => (
                                    <label key={lang[0]}>
                                        <input
                                            type="checkbox"
                                            value={lang[0]}
                                            checked={selectedLanguages.includes(lang[0])}
                                            onChange={() => {
                                                setSelectedLanguages((prev) =>
                                                    prev.includes(lang[0]) ? prev.filter((l) => l !== lang[0]) : [...prev, lang[0]]
                                                );
                                            }}
                                        />
                                        {lang[0]}
                                        ({lang[1]})
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4>Editors</h4>
                            <div className="multi-select">
                                {Object.entries(availableEditors).map((editor) => (
                                    <label key={editor[0]}>
                                        <input
                                            type="checkbox"
                                            value={editor[0]}
                                            checked={selectedEditors.includes(editor[0])}
                                            onChange={() => {
                                                setSelectedEditors((prev) =>
                                                    prev.includes(editor[0]) ? prev.filter((e) => e !== editor[0]) : [...prev, editor[0]]
                                                );
                                            }}
                                        />
                                        {editor[0]}
                                        ({editor[1]})
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button onClick={applySelectedFilters} >Filtrar</button>
                        </div>
                    </div>
                    
                </div>
            )}
            <div>
              <h4>Areas</h4>
              <div className="multi-select">
                {Object.entries(availableAreas).map((area) => (
                  <label key={area[0]}>
                    <input
                      type="checkbox"
                      value={area[0]}
                      checked={selectedAreas.includes(area[0])}
                      onChange={() => {
                        setSelectedAreas((prev) =>
                          prev.includes(area[0])
                            ? prev.filter((a) => a !== area[0])
                            : [...prev, area[0]]
                        );
                      }}
                    />
                    {area[0]}({area[1]})
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4>Languages</h4>
              <div className="multi-select">
                {Object.entries(availableLanguages).map((lang) => (
                  <label key={lang[0]}>
                    <input
                      type="checkbox"
                      value={lang[0]}
                      checked={selectedLanguages.includes(lang[0])}
                      onChange={() => {
                        setSelectedLanguages((prev) =>
                          prev.includes(lang[0])
                            ? prev.filter((l) => l !== lang[0])
                            : [...prev, lang[0]]
                        );
                      }}
                    />
                    {lang[0]}({lang[1]})
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4>Editors</h4>
              <div className="multi-select">
                {Object.entries(availableEditors).map((editor) => (
                  <label key={editor[0]}>
                    <input
                      type="checkbox"
                      value={editor[0]}
                      checked={selectedEditors.includes(editor[0])}
                      onChange={() => {
                        setSelectedEditors((prev) =>
                          prev.includes(editor[0])
                            ? prev.filter((e) => e !== editor[0])
                            : [...prev, editor[0]]
                        );
                      }}
                    />
                    {editor[0]}({editor[1]})
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button onClick={applySelectedFilters}>Filtrar</button>
            </div>
          </div>
           */}
                </div>
        </div>
    );
}

export default FilterBar;
