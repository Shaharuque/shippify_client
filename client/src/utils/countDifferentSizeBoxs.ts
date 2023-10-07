
const coutingDictionary = {
    "box1": 0,
    "box2": 0,
    "box3": 0,
    "box4": 0,
    "custom": 0
}
export const countDifferentSizeBoxes=(basicShipmentPackage:any)=>{
    console.log(basicShipmentPackage)
    basicShipmentPackage?.forEach((shipment:any)=>{
        if(shipment.dimensions?.length * shipment.dimensions?.width * shipment.dimensions?.height == 700){
            coutingDictionary.box1+=1
        }
        if(shipment.boxSize==="box2"){
            coutingDictionary.box2+=1
        }
        if(shipment.boxSize==="box3"){
            coutingDictionary.box3+=1
        }
        if(shipment.boxSize==="box4"){
            coutingDictionary.box4+=1
        }
        else{
            coutingDictionary.custom+=1
        }
    })
    console.log(coutingDictionary) 
}