var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent();
    },
    receivedEvent: function() 
    {
        iniciarIcbf();
    }
};

function iniciarIcbf()
{
    cargarModulo("Inicio.html", "Inicio");
}

