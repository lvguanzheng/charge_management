import React from 'react'
import { Input, Button, Form, Modal } from 'antd'
import moment from 'moment'

import styles from './CharageManagement.less'
import FeeDetail from './FeeDetail'

const FormItem = Form.Item

class ChargeManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            details: new Map()
        }
        this.detailMap = new Map()
    }
    componentDidMount(){
    }
    checkPrecise = type => {
        if(type === 'reserve') {
            this.reserve()
        } else {
            this.cancelReserve()
        }
    }
    reserve = () => {
        const { form: { validateFields, getFieldsValue, getFieldValue, resetFields } } = this.props
        const validateFieldsValue = getFieldsValue()
        validateFields(Object.keys(validateFieldsValue), (err, values) => {
            if (!err) {
                const info = getFieldValue("reservationInfo")
                const infoArr = info.split(' ')
                if(infoArr.length !== 4) {
                    return Modal.error({
                        title: '输入有误',
                        content: '输入的订单信息格式不正确！'
                    })
                } else {
                    const timeArr = infoArr[2].split('~')
                    const startClock = timeArr[0].split(':')
                    const endClock = timeArr[1].split(':')
                    if(startClock[1] !== '00' || endClock[1] !== '00') {
                        return Modal.error({
                            title: '输入有误',
                            content: '订单时间段必须为整点！'
                        })
                    }
                    if(startClock[0] >= endClock[0] || startClock[0] < 8 || endClock[0] > 22) {
                        return Modal.error({
                            title: '输入有误',
                            content: '订单时间输入不正确！'
                        })
                    }
                    const weekDay = moment(infoArr[1]).isoWeekday()
                    const fee = this.detailExpense(weekDay, startClock[0], endClock[0])
                    let reserveDetail = {
                        detailId: infoArr[0],
                        date: infoArr[1],
                        startClock: startClock,
                        endClock: endClock,
                        type: infoArr[3],
                        fee: fee,
                        isCancel: false
                    }
                    this.saveDetail(reserveDetail)
                }
            }
        })
    }
    cancelReserve = () => {
        const { form: { validateFields, getFieldsValue, getFieldValue, resetFields } } = this.props
        const validateFieldsValue = getFieldsValue()
        validateFields(Object.keys(validateFieldsValue), (err, values) => {
            if (!err) {
                const info = getFieldValue("reservationInfo")
                const infoArr = info.split(' ')
                if(infoArr.length !== 4) {
                    return Modal.error({
                        title: '输入有误',
                        content: '输入的订单信息格式不正确！'
                    })
                } else {
                    if(this.detailMap.has(infoArr[0])) {
                        if(this.detailMap.get(infoArr[0]).isCancel) {
                            return Modal.warning({
                                title: '订单信息',
                                content: '该订单已经取消，不可重复操作！'
                            })
                        }
                        const detailInfo = this.detailMap.get(infoArr[0])
                        const fee = moment(infoArr[1]).isoWeekday() === 6 || moment(infoArr[1]).isoWeekday() === 7 ? detailInfo.fee*0.3 : detailInfo.fee*0.7
                        this.detailMap.set(infoArr[0], {...detailInfo, fee: fee, isCancel: true})
                        this.setState({
                            details: this.detailMap
                        },() => {
                            Modal.success({
                                title: '取消订单',
                                content: <span>订单<span className={styles['modal-text']}>{infoArr[0]}</span>已经取消成功</span>
                            })
                        })
                    } else {
                        Modal.warning({
                            title: '订单信息',
                            content: '该订单不存在，无法执行取消操作！'
                        })
                    }
                }
            }
        })
    }
    saveDetail = (detail) => {
        if(this.detailMap.has(detail.detailId)) {
            return Modal.warning({
                title: 'ID重复',
                content: '输入的订单ID重复！'
            })
        }
        this.isTimeConflict(this.detailMap, detail)
    }
    isTimeConflict = (typeMap, detail) => {
        const { form: { resetFields } } = this.props
        for(let value of typeMap.values()) {
            let overlap = false
            if((detail.startClock[0] >= value.startClock[0] && detail.startClock[0] < value.endClock[0]) || (value.startClock[0] >= detail.startClock[0] && value.startClock[0] < detail.endClock[0])) {
                overlap = true
            }
            if(detail.date === value.date && overlap && detail.type === value.type) {
                resetFields()
                return Modal.warning({
                    title: '时间重合',
                    content: '该时间段已经有人预定！'
                })
            }
        }
        typeMap.set(detail.detailId, detail)
        this.setState({
            details: typeMap
        },() => {
            resetFields()
            Modal.success({
                title: '预定成功',
                content: <span>恭喜<span className={styles['modal-text']}>{detail.detailId}</span>订单预定成功！</span>
            })
        })
    }
    detailExpense = (detailDay, startTime, endTime) => {
        let cash=0
        if(1 <= detailDay && detailDay <= 5) {
           if (startTime >= 8 && startTime < 11) {
               if (endTime <= 11) {
                   cash = (endTime - startTime)*25
                   return cash
               }else if (endTime <= 15 && endTime > 11) {
                   cash = (11 - startTime)*25 + (endTime - 11)*40
                   return cash
               }else if (endTime <= 18 && endTime > 15) {
                   cash = (11 - startTime)*25 + (15 - 11)*40 + (endTime - 15)*30
                   return cash
               }else if (endTime <= 20 && endTime > 18) {
                   cash = (11 - startTime)*25 + (15 - 11)*40 + (18 - 15)*30 + (endTime - 18)*90
                   return cash
               }else if (endTime <= 22 && endTime > 20) {
                   cash = (11 - startTime)*25 + (15 - 11)*40 + (18 - 15)*30 + (20 - 18)*90 + (endTime - 20)*70
                   return cash
               }
           }
           else if (startTime >= 11 && startTime < 15) {
               if (endTime <= 15) {
                   cash = (endTime - startTime)*40
                   return cash
               }
               else if (endTime <= 18 && endTime > 15) {
                   cash = (15 - startTime)*40 + (endTime - 15)*30
                   return cash
               }else if (endTime <= 20 && endTime > 18) {
                   cash = (15 - startTime)*40 + (18 - 15)*30 + (endTime - 18)*90
                   return cash
               }else if (endTime <= 22 && endTime > 20) {
                   cash = (15 - startTime)*40 + (18 - 15)*30 + (20 - 18)*90 + (endTime - 20)*70
                   return cash
               }
           }
           else if (startTime >= 15 && startTime < 18) {
               if (endTime <= 18) {
                   cash = (endTime - startTime)*30
                   return cash
               }
               else if(endTime <= 20 && endTime > 18) {
                   cash = (18 - startTime)*30 + (endTime - 18)*90
                   return cash
               }
               else if (endTime <= 22 && endTime > 20) {
                   cash = (18 - startTime)*30 + (20 - 18)*90 + (endTime - 20)*70
                   return cash
               }
           }
           else if (startTime >= 18 && startTime < 20) {
               if (endTime <= 20) {
                   cash = (endTime - startTime)*90
                   return cash
               }else if (endTime <= 22 && endTime > 20) {
                   cash = (20 - startTime)*90 + (endTime - 20)*70
               }
           }
           else if (startTime >= 20 && startTime < 22) {
               if (endTime <= 22) {
                   cash = (endTime - startTime)*70
                   return cash
               }
           }
       }
       else if (6 <= detailDay && detailDay <= 7) {
           if (startTime >= 8 && startTime < 12) {
               if (endTime <= 12) {
                   cash = (endTime - startTime)*50
                   return cash
               }
               else if (endTime <= 17 && endTime > 12) {
                   cash = (12 - startTime)*50 + (endTime - 12)*70
                   return cash
               }else if (endTime <= 22 && endTime > 17) {
                   cash = (12 - startTime)*50 + (17 - 12)*70 + (endTime - 17)*90
                   return cash
               }
           } else if (startTime >= 12 && startTime < 17) {
               if (endTime <= 17) {
                   cash = (endTime - startTime)*70
                   return cash
               } else if (endTime <= 22 && endTime > 17) {
                   cash = (17 - startTime)*70 + (endTime - 17)*90
                   return cash
               }
           } else if (startTime >= 17 && startTime < 22) {
               cash = (endTime - startTime)*90
               return cash
           }
       }
       return 0
    }
    render() {
        const { form: { getFieldDecorator, resetFields } } = this.props
        const { details } = this.state
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
        }
        return (
           <div className={styles['charge-block']}>
               <div>
                   <Form layout="inline" onSubmit={this.checkPrecise}>
                        <FormItem
                        label="信息填写"
                        {...formItemLayout}
                        className={styles['form-item-block']}
                        >
                        {getFieldDecorator('reservationInfo',{
                            rules: [{
                                required: true, message: '预约信息必填'
                            }]
                        })(
                            <Input placeholder="请输入预约信息"/>
                        )}
                        </FormItem>
                        <Button type="primary" className={styles['btn-reserve']} onClick={() => this.checkPrecise('reserve')}>订单预约</Button>
                        <Button type="primary" className={styles['btn-cancel-reserve']} onClick={() => this.checkPrecise('cancelReserve')}>取消订单</Button>
                        <Button type="primary" className={styles['btn-reset']} onClick={() => resetFields()}>重置输入</Button>
                   </Form>
               </div>
               <div className={styles['result-block']}>
                    <div className={styles['btn-tip-block']}>
                        <span className={styles['text-check']}>当前收入</span>
                    </div>
                    <div>
                        <div className={styles['income-text']}>>income summary</div>
                        <FeeDetail details={details}/>
                    </div>
               </div>
           </div>
        )
    }
}

export default Form.create()(ChargeManagement)