<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
.page {
	width: 100%;
	padding: 32rpx;
	box-sizing: border-box;
}

.sub-page {
	width: 100%;
	/* padding-top: 200rpx; */
	padding-top: 32rpx;
	min-height: 100vh;
	max-height: auto;
	background: #efefef;
	box-sizing: border-box;
}

.title {
	position: relative;
	z-index: 1;
	width: fit-content;
	padding: 32rpx 0;
	font-size: 48rpx;
	font-weight: bold;

	&::after {
		content: '';
		opacity: .5;
		position: absolute;
		z-index: 0;
		left: 0;
		bottom: 32rpx;
		width: 100%;
		height: 12rpx;
		border-radius: 666rpx;
		background-color: orange;
	}
}

.sub-title {
	font-size: 32rpx;
	padding: 32rpx 0;
}

.text {
	font-size: 32rpx;
}
</style>


<style lang="scss">

:root,
page {
	--wot-color-theme: #ff9900;
}

.wd-divider {
	padding: unset !important;
}
</style>
