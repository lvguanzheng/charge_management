import React from 'react'

import styles from './FeeDetail.less'

class FeeDetail extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			X: [],
			N: [],
			G: [],
			H: []
		}
	}
	componentDidMount() {
		const { details } = this.props
		const xMap = new Map(
            [...details].filter(([k, v]) => v.type === 'X')
        )
        const nMap = new Map(
        	[...details].filter(([k, v]) => v.type === 'N')
        )
        const gMap = new Map(
        	[...details].filter(([k, v]) => v.type === 'G')
        )
        const hMap = new Map(
        	[...details].filter(([k, v]) => v.type === 'H')
        )
        this.setState({
        	X: [...xMap],
        	N: [...nMap],
        	G: [...gMap],
        	H: [...hMap]
        })
	}
	componentWillReceiveProps = nextProps => {
		if(nextProps && nextProps.details) {
			const xMap = new Map(
                [...nextProps.details].filter(([k, v]) => v.type === 'X')
            )
	        const nMap = new Map(
	        	[...nextProps.details].filter(([k, v]) => v.type === 'N')
	        )
	        const gMap = new Map(
	        	[...nextProps.details].filter(([k, v]) => v.type === 'G')
	        )
	        const hMap = new Map(
	        	[...nextProps.details].filter(([k, v]) => v.type === 'H')
	        )
	        this.setState({
	        	X: [...xMap],
	        	N: [...nMap],
	        	G: [...gMap],
	        	H: [...hMap]
	        })
		}
	}
	render() {
		const { X, N, G, H } = this.state
		let xSubTotal = 0
		let nSubTotal = 0
		let gSubTotal = 0
		let hSubTotal = 0
		X.forEach(x => {
			xSubTotal += x[1].fee
		})
		N.forEach(n => {
			nSubTotal += n[1].fee
		})
		G.forEach(g => {
			gSubTotal += g[1].fee
		})
		H.forEach(h => {
			hSubTotal += h[1].fee
		})
		return (
			<div>
			    <div className={styles['line']}>------</div>
			        <div>
			            <div className={styles['place-text']}>place: X</div>
			            {X.map((xItem, index) => {
			            	return <div key={index}><span className={styles['detail-item-text']}>{xItem[1].date}</span><span>{xItem[1].startClock[0]}:00~</span><span className={styles['detail-item-text']}>{xItem[1].endClock[0]}:00</span>{xItem[1].isCancel && <span className={styles['detail-item-text']}>penalty</span>}<span className={styles['money-text']}>{xItem[1].fee}元</span></div>
			            })}
			            <div>subtotal:<span className={styles['money-text']}>{xSubTotal}元</span></div>
			        </div>
			        <div>
			            <div className={styles['place-text']}>place: N</div>
			            {N.map((nItem, index) => {
			            	return <div key={index}><span className={styles['detail-item-text']}>{nItem[1].date}</span><span>{nItem[1].startClock[0]}:00~</span><span className={styles['detail-item-text']}>{nItem[1].endClock[0]}:00</span>{nItem[1].isCancel && <span className={styles['detail-item-text']}>penalty</span>}<span className={styles['money-text']}>{nItem[1].fee}元</span></div>
			            })}
			            <div>subtotal:<span className={styles['money-text']}>{nSubTotal}元</span></div>
			        </div>
			        <div>
			            <div className={styles['place-text']}>place: G</div>
			            {G.map((gItem, index) => {
			            	return <div key={index}><span className={styles['detail-item-text']}>{gItem[1].date}</span><span>{gItem[1].startClock[0]}:00~</span><span className={styles['detail-item-text']}>{gItem[1].endClock[0]}:00</span>{gItem[1].isCancel && <span className={styles['detail-item-text']}>penalty</span>}<span className={styles['money-text']}>{gItem[1].fee}元</span></div>
			            })}
			            <div>subtotal:<span className={styles['money-text']}>{gSubTotal}元</span></div>
			        </div>
			        <div>
			            <div className={styles['place-text']}>place: H</div>
			            {H.map((hItem, index) => {
			            	return <div key={index}><span className={styles['detail-item-text']}>{hItem[1].date}</span><span>{hItem[1].startClock[0]}:00~</span><span className={styles['detail-item-text']}>{hItem[1].endClock[0]}:00</span>{hItem[1].isCancel && <span className={styles['detail-item-text']}>penalty</span>}<span className={styles['money-text']}>{hItem[1].fee}元</span></div>
			            })}
			            <div>subtotal:<span className={styles['money-text']}>{hSubTotal}元</span></div>
			        </div>
			    <div className={styles['line']}>------</div>
			    <div className={styles['line']}>total:<span className={styles['money-text']}>{xSubTotal+nSubTotal+gSubTotal+hSubTotal}元</span></div>
			</div>
		)
	}
}

export default FeeDetail