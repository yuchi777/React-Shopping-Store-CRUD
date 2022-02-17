//轉換幣值
export const formatPrice = (cents) =>{
    return (cents/10).toLocaleString('ja-JP',{
        style:'currency',
        currency:'JPY',
        minimumFractionDigits:2
    })
}