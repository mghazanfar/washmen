import axios from "axios";

const basePartnerUrl = 'http://localhost:3000/partners'

export const getPartners = () => {
    return axios.get(basePartnerUrl)
}
export const getPartnersByDistance = (distance:string) => {
    return axios.get(basePartnerUrl+'/'+distance)
}