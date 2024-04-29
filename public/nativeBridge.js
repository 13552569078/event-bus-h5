class NativeBridge {

    // callBackName 必须是全局能访问的的方法名，
    constructor() {
        // 在构造函数中检测并存储平台
        this._platform = this._detectPlatform();
    }

    // 逐级返回功能
    goBack() {
        this._platformSpecificCall('goBack');
    }

    // 关闭
    close() {
        this._platformSpecificCall('close');
    }
    // 保存数据到app
    setData(key,value){
        this._platformSpecificCall('setData',{key,value});
    }
    // 从app 获取对应保存数据
    getData(key){
        let data=this._platformSpecificCall('getData',{key})
        console.log("getdata="+data)
        return data;
    }
    // 持久化保存数据，除非应用卸载
    setPersistData(key,value){
        this._platformSpecificCall('setPersistData',{key,value});
    }
    // 获取持久化数据
    getPersistData(key){
        let data=this._platformSpecificCall('getPersistData',{key})
        console.log("getPersistData="+data)
        return data;
    }
    // 获取位置信息
    getLocation(callBackName) {
        if(callBackName){
            this._platformSpecificCall('getLocation', {callBackName});
        }else{
            this._platformSpecificCall('getLocation_old');
        }

    }

    // 开启定位服务
    startContinueLocation(timeInterval, callBackName) {
        var params=timeInterval
        this._platformSpecificCall('startContinueLocation',{params,callBackName});
    }

    // 关闭定位服务
    stopContinueLocation() {
        this._platformSpecificCall('stopContinueLocation');
    }
    // 首页打开新的window
    openWindow(title,url,callBackName,titleHide){
        let params={}
        params.title=title
        params.url=url
        if(titleHide){
            params.style={ }
            params.style.titleHide=titleHide
        }
        let strParams=JSON.stringify(params)
        this._callNative("openWindow",strParams,callBackName)
    }
    // 开启会议
    startMeet(callBackName){
        this._callNative("startMeet","",callBackName)
    }
    //开启通话
    // type:："voice","video" ,""  为空时，去三方默认界面
    // ,number ：呼叫号码
    startCall(type,number,callBackName){
        let params={}
        if(type){
            params.type=type
            params.number=number
        }

        this._callNative("startCall",JSON.stringify(params),callBackName)
    }
   // 获取navTreedata
    getNavTreeData(code,callBackName){
        let params={}
        params.code=code
        this._callNative("getNavTreeData",JSON.stringify(params),callBackName)
    }
    _callNative(methodName, params, callBackName){
        let callBackFunName=""
        if(callBackName){
            callBackFunName=callBackName
        }
        this.callNative(methodName,params,callBackFunName)
    }

    // 业务方法统一入口
    callNative(methodName, params, callBackName) {
        console.log("methodName="+methodName)
        console.log("params="+params)
        console.log("callBackName="+callBackName)
        this._platformSpecificCall('callNative',{ methodName, params, callBackName});
    }

    _platformSpecificCall(methodName, args) {
        console.log("methodName="+methodName)
        const platformMethod = this._platformMethods[this._platform][methodName];
        if (platformMethod) {
           return platformMethod(args);
            console.log(`Executing ${methodName} on ${this._platform} platform`);
        } else {
            console.error("Unsupported platform");
        }
    }

    _detectPlatform() {
        if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
            return 'iOS';
        } else if (/android/i.test(navigator.userAgent)) {
            return 'android';
        } else {
            return 'unsupported';
        }
    }

    _platformMethods = {
        iOS: {
            goBack: () => window.webkit.messageHandlers.goBack.postMessage(null),
            close: () => window.webkit.messageHandlers.close.postMessage(null),
            getLocation: ({callBackName } )=> window.webkit.messageHandlers.getLocation.postMessage(callBackName),
            getLocation_old: () => window.webkit.messageHandlers.getLocation.postMessage(null),
            startContinueLocation: ({params,callBackName } ) => window.webkit.messageHandlers.startContinueLocation.postMessage({ params, callBackName }),
            stopContinueLocation: () => window.webkit.messageHandlers.stopContinueLocation.postMessage(null),
            callNative: ({methodName,params,callBackName } ) => window.webkit.messageHandlers.callNative.postMessage({ methodName, params, callBackName }),
            setData:({key,value } ) => window.webkit.messageHandlers.setData.postMessage({key, value}),
            getData:({key}) => {
                let data=window.prompt('getData', key)
                console.log("data="+data)
                return data
            },
            setPersistData:({key,value } ) => window.webkit.messageHandlers.setPersistData.postMessage({key, value}),
            getPersistData:({key}) => {
                let data=window.prompt('getPersistData', key)
                console.log("data="+data)
                return data
            },
        },
        android: {
            goBack: () => window.clientJsInterface.goBack(),
            close: () => window.clientJsInterface.close(),
            getLocation: ({callBackName } ) => window.clientJsInterface.getLocation(callBackName),
            getLocation_old: () => window.clientJsInterface.getLocation(),
            startContinueLocation: ({params,callBackName } ) => window.clientJsInterface.startContinueLocation(params, callBackName),
            stopContinueLocation: () => window.clientJsInterface.stopContinueLocation(),
            callNative: ({methodName,params,callBackName } ) => window.clientJsInterface.callNative(methodName, params, callBackName),
            setData:({key,value } ) => window.clientJsInterface.setData(key,value),
            getData:({key}) => {
                let data=window.clientJsInterface.getData(key)
                console.log("data="+data)
                return data
            },
            setPersistData:({key,value } ) => window.clientJsInterface.setPersistData(key,value),
            getPersistData:({key}) => {
                let data=window.clientJsInterface.getPersistData(key)
                console.log("data="+data)
                return data
            },

        },
    };
}

// 导出 NativeBridge 类的单例对象
const nativeBridge = new NativeBridge();
window.nativeBridge = nativeBridge;

// 导出 NativeBridge 实例
// export default nativeBridge;

