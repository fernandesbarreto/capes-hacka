
const WorkcapesTabViewer = () => {
    
    return(
        <div>
                  <div style={{ display: "flex", alignItems: "baseline", marginBottom: "24px", marginTop: "24px" }}>
        <h1 style={{ fontWeight: "600", fontSize: "29px", color: "#1351B4", margin: "0", paddingRight: "5px" }}>Meu Espaço</h1>
        <p style={{ margin: "0", paddingRight: "5px" }}>Você tem acesso ao conteúdo exclusivo através do acesso</p>
        <p style={{ margin: "0", color: "#1351B4" }}>CAFe</p>
        <br-button circle icon="caret-down"></br-button>
      </div>


      <div style={{ width: "100%", marginBottom: "40px" }}>
        <div className="tabs-container">
          <p className="tab-title selected-tab" >Workcapes</p>
          <p className="tab-title">Treinamentos</p>
          <p className="tab-title">Conta</p>
        </div>

        <hr
          style={{
            marginTop: "0px",
            border: "none",
            borderTop: "1px solid #ccc",
          }}
        />
      </div>
        </div>
    )
}

export default WorkcapesTabViewer;
