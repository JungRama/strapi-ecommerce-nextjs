export interface ValidateAddressInterface{
  isVerified: boolean
  data: {
    zip4: {
      success: boolean
      errors: Array<any>
      details: any
    }
    delivery: {
      success: boolean
      errors: Array<any>
      details: {
        latitude: number
        longitude: number
        time_zone: string
      }
    }
  }
}

export interface RatesInterface {
  id: string
  rates: {
    id: string
    object: string
    created_at: string
    updated_at: string
    mode: string
    service: string
    carrier: string
    rate: string
    currency: string
    retail_rate: string
    retail_currency: string
    list_rate: string
    list_currency: string
    billing_type: string
    delivery_days: any
    delivery_date: any
    delivery_date_guaranteed: boolean
    est_delivery_days: any
    shipment_id: string
    carrier_account_id: string
  }[]
}
