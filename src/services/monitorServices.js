import api from "@/utils/api";
import { toast } from "react-toastify";

export const SendAddData = async (attribute) => {
  let result = {};
  
  const timeOptions = ["15S", "30S", "1M", "5M", "15M", "30M", "1H"];
  
  try {
    if ( attribute.selectedMonitor === "HTTP" ) {
      result = {
        "uuidUsers": attribute.uuidUsers,
        "hostname": attribute.hostname,
        "ipaddress": attribute.ipaddress,
        "statusCheck": timeOptions[attribute.checkTime],
      }
      let response = await api.post('http://127.0.0.1:5000/api/add_monitor_http/', result);
      toast.success(response.data.msg);
      return true;
    }
    
    if ( attribute.selectedMonitor === "Ports" ){
      result = {
        "uuidUsers": attribute.uuidUsers,
        "hostname": attribute.hostname,
        "ipaddress": attribute.ipaddress,
        "port": attribute.ports,
        "protocol": attribute.protocol,
        "statusCheck": timeOptions[attribute.checkTime],
      }
      let response = await api.post('http://127.0.0.1:5000/api/add_monitor_port/', result);
      toast.success(response.data.msg);
      return true;
    }
    
    result = {
      "uuidUsers": attribute.uuidUsers,
      "hostname": attribute.hostname,
      "ipaddress": attribute.ipaddress,
      "statusCheck": timeOptions[attribute.checkTime],
      "snmp_username": attribute.username,
      "snmp_authkey": attribute.authkey,
      "snmp_privkey": attribute.privkey,
      "snmp_port": attribute.ports,
    };
    
    let response = await api.post('http://127.0.0.1:5000/api/add_monitor_devices/', result);
    toast.success(response.data.msg);
    
    return true;

  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("Network error or server not responding.");
    }
  }
  
  // return alert
}
export const SendEditData = async (attribute) => {
  let result = {};
  
  try {
    if ( attribute.selectedMonitor === "https" ) {
      result = {
        "uuid": attribute.uuidMonitors,
        "hostname": attribute.hostname,
        "ipaddress": attribute.ipaddress,
        "statusCheck": attribute.selectedTime,
      }
      let response = await api.patch('/edit_monitor_https', result);
      toast.success(response.data.msg);
      return true;
    }
    
    if ( attribute.selectedMonitor === "ports" ){
      result = {
        "uuid": attribute.uuidMonitors,
        "hostname": attribute.hostname,
        "ipaddress": attribute.ipaddress,
        "port": attribute.ports,
        "protocol": attribute.protocol,
        "statusCheck": attribute.selectedTime,
      }
      let response = await api.patch('/edit_monitor_ports', result);
      toast.success(response.data.msg);
      return true;
    }
    
    result = {
      "uuidDevices": attribute.uuidMonitors,
      "hostname": attribute.hostname,
      "ipaddress": attribute.ipaddress,
      "statusCheck": attribute.selectedTime,
      "snmp_username": attribute.username,
      "snmp_authkey": attribute.authkey,
      "snmp_privkey": attribute.privkey,
      "snmp_port": attribute.ports,
    };
    
    let response = await api.patch('/edit_monitor_devices', result);
    toast.success(response.data.msg);
    
    return true;

  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.msg);
    } else {
      toast.error(error.message);
    }
    return;
  }  
}

export const getLatestPing = (item) => {
  if (item.logs && item.logs.length > 0) {
    const latestLog = item.logs[item.logs.length - 1];
    return latestLog.responseTime || 0;
  }
  return 0;
};

export const handleSelectedTrigger = async (
  selectedMonitors,
  data,
  getData,
  setSelectedMonitors,
  setActionPop,
  onRefresh
) => {
  setActionPop(false);

  const toastprop = toast.loading('Loading...');

  if ( selectedMonitors.length < 1 ){
    toast.update(toastprop, {
      render: "Select monitor first!",
      type: "info",
      isLoading: false,
      autoClose: 2500,
    });
    return;
  }
  
  try {
    for (const uuid of selectedMonitors) {
      const selectedData = data.find((item) => item.uuidMonitors === uuid);
      if (!selectedData) continue; // Skip if not found

      let endpoint = "";
      let payload = {};

      if (selectedData.type === "https") {
        endpoint = "/add_logs_http";
        payload = { uuidHTTPs: selectedData.uuidMonitors };
      } else if (selectedData.type === "devices") {
        endpoint = "/add_logs_devices";
        payload = { uuidDevices: selectedData.uuidMonitors };
      } else if (selectedData.type === "port") {
        endpoint = "/add_logs_port";
        payload = { uuidPort: selectedData.uuidMonitors };
      }

      const res = await api.post(endpoint, payload);
    }

    getData();
    setSelectedMonitors([]);
    if (onRefresh) { onRefresh() };


    toast.update(toastprop, {
      render: "Logs successfully created on selected monitor!",
      type: "success",
      isLoading: false,
      autoClose: 2500,
    });
  } catch (error) {
    if ( error.response ){
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while creating logs.");
    }
  }
};

export const handleSelectedStart = async (
  selectedMonitors,
  data,
  getData,
  setSelectedMonitors,
  setActionPop,
  onRefresh
) => {
  setActionPop(false);

  const toastprop = toast.loading('Loading...');

  if ( selectedMonitors.length < 1 ){
    toast.update(toastprop, {
      render: "Select monitor first!",
      type: "info",
      isLoading: false,
      autoClose: 2500,
    });
    return;
  }
  
  try {
    for (const uuid of selectedMonitors) {
      const selectedData = data.find((item) => item.uuidMonitors === uuid);
      if (!selectedData) continue; // Skip if not found
      
      const payload = {
        uuid: selectedData.uuidMonitors,
        type: selectedData.type,
      };

      await api.patch("/start_monitor", payload);
    }

    // Refresh your data so that the UI updates without a full page reload
    getData();
    // Clear the selected monitors after processing
    setSelectedMonitors([]);
    if (onRefresh) { onRefresh() };

    toast.update(toastprop, {
      render: "Monitors started successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2500,
    });
  } catch (error) {
    if ( error.response ){
      toast.update(toastprop, {
        render: error.response.data.msg ,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    } else {
      toast.update(toastprop, {
        render: "An error occurred while creating logs.",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  }
};

export const handleSelectedPause = async (
  selectedMonitors,
  data,
  getData,
  setSelectedMonitors,
  setActionPop,
  onRefresh
) => {
  setActionPop(false);

  // Start a loading toast and store its id
  const toastprop = toast.loading("Loading...");

  if (selectedMonitors.length < 1) {
    toast.update(toastprop, {
      render: "Select monitor first!",
      type: "info",
      isLoading: false,
      autoClose: 2500,
    });
    return;
  }

  try {
    for (const uuid of selectedMonitors) {
      const selectedData = data.find((item) => item.uuidMonitors === uuid);
      if (!selectedData) continue; // Skip if not found

      const payload = {
        uuid: selectedData.uuidMonitors,
        type: selectedData.type,
      };

      await api.patch("/pause_monitor", payload);
    }

    // Refresh your data and clear selected monitors
    getData();
    setSelectedMonitors([]);
    if (onRefresh) { onRefresh() };

    toast.update(toastprop, {
      render: "Monitors paused successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2500,
    });
  } catch (error) {
    if (error.response) {
      toast.update(toastprop, {
        render: error.response.data.msg ,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    } else {
      toast.update(toastprop, {
        render: "An error occurred while pausing monitors.",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  }
};

export const handleSelectedClear = async (
  selectedMonitors,
  data,
  getData,
  setSelectedMonitors,
  setActionPop,
  onRefresh
) => {
  setActionPop(false);

  // Start a loading toast and store its ID
  const toastprop = toast.loading("Loading...");

  if (selectedMonitors.length < 1) {
    toast.update(toastprop, {
      render: "Select monitor first!",
      type: "info",
      isLoading: false,
      autoClose: 2500,
    });
    return;
  }

  try {
    for (const uuid of selectedMonitors) {
      const selectedData = data.find((item) => item.uuidMonitors === uuid);
      if (!selectedData) continue; // Skip if not found

      const payload = {
        uuid: selectedData.uuidMonitors,
        type: selectedData.type,
      };

      // Send DELETE request with payload using the data property in config
      await api.delete("/clear_logs", { data: payload });
    }

    // Refresh data and clear selected monitors
    getData();
    setSelectedMonitors([]);
    if (onRefresh) { onRefresh() };

    toast.update(toastprop, {
      render: "Logs cleared successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2500,
    });
  } catch (error) {
    if (error.response) {
      toast.update(toastprop, {
        render: error.response.data.msg ,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    } else {
      toast.update(toastprop, {
        render: "An error occurred while clearing logs.",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  }
};

export const handleSelectedDelete = async (
  selectedMonitors,
  data,
  getData,
  setSelectedMonitors,
  setActionPop
) => {
  setActionPop(false);

  // Start a loading toast and store its ID
  const toastprop = toast.loading("Loading...");

  if (selectedMonitors.length < 1) {
    toast.update(toastprop, {
      render: "Select monitor first!",
      type: "info",
      isLoading: false,
      autoClose: 2500,
    });
    return;
  }

  try {
    for (const uuid of selectedMonitors) {
      const selectedData = data.find((item) => item.uuidMonitors === uuid);
      if (!selectedData) continue; // Skip if not found

      const payload = {
        uuid: selectedData.uuidMonitors,
        type: selectedData.type,
      };

      // Pass the payload in the data property of the config object for DELETE
      await api.delete("/delete_monitor", { data: payload });
    }

    // Refresh data to reflect the updated status
    getData();
    // Clear the selected monitors
    setSelectedMonitors([]);
    if (onRefresh) { onRefresh() };

    toast.update(toastprop, {
      render: "Monitors deleted successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2500,
    });
  } catch (error) {
    if (error.response) {
      toast.update(toastprop, {
        render: error.response.data.msg ,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    } else {
      toast.update(toastprop, {
        render: "An error occurred while deleting monitor.",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  }
};
