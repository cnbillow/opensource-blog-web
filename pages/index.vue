<template>
	<div class="index">
		<x-header @do-search="doSearch"></x-header>
		<to-top></to-top>
		<div class="i-tab">
			<div class="t-wrap">
				<div
						class="w-item"
						:class="{'w-item-active': home.articles.form.type === item.id}"
						:key="key"
						@click="changeType(item)"
						v-for="(item, key) in home.articles.types"
				>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="i-main">
			<div class="m-left">
				<div class="l-articles">
					<div class="a-tab">
						<div
								class="t-item"
								:class="{'t-item-active': home.articles.form.sort === 0}"
								@click="changeSort(0)"
						>
							<span>推荐</span>
						</div>
						<div
								class="t-item"
								:class="{'t-item-active': home.articles.form.sort === 1}"
								@click="changeSort(1)"
						>
							<span>最新</span>
						</div>
						<div
								class="t-item"
								:class="{'t-item-active': home.articles.form.sort === 2}"
								@click="changeSort(2)"
						>
							<span>热门</span>
						</div>
					</div>
					<ul class="a-list">
						<li class="l-item" :key="key" v-for="(item, key) in home.articles.list">
							<a :href="'/article/' + item.id" target="_blank">
								<div class="i-info">
									<span>文章</span>
									<span>{{'id' in item.user ? item.user.nickname : ''}}</span>
									<span v-if="item.tag.length">{{item.tag[0].name}}</span>
								</div>
								<div class="i-name">
                                    <span
											v-if="item.section.length && item.section[0].book"
									>《{{item.section[0].book.title}}》</span>
									<span>{{item.title}}</span>
								</div>
								<div class="i-do">
									<div class="d-btns">
										<div class="b-item">
											<i class="iconfont icon-like"></i>
											<span>{{item.praise_count}}</span>
										</div>
										<div class="b-item">
											<i class="iconfont icon-pinglun"></i>
											<span>{{item.comment_count}}</span>
										</div>
									</div>
								</div>
								<div
										class="i-cover"
										:style="{backgroundImage: `url(${qiniuBaseUrl + item.cover})`}"
										v-if="item.cover"
								></div>
							</a>
						</li>
					</ul>
					<div class="a-more">
						<div class="m-wrap" @click="home.articles.more ? getArticles() : ''">
							<span v-if="home.articles.more">查看更多文章</span>
							<span v-else>暂无更多文章</span>
						</div>
					</div>
				</div>
				<x-footer></x-footer>
			</div>
			<div class="m-right">
				<div class="r-section r-section-mp">
					<div class="m-title">
						<span>关注公众号《kyeteo码上闲谈》</span>
					</div>
					<div class="m-desc">
						<div class="d-item">
							<span>→「技术干货」每日推送</span>
						</div>
						<div class="d-item">
							<span>→「免费资料」随时领取</span>
						</div>
						<div class="d-item">
							<span>→「签到活动」每周福利</span>
						</div>
					</div>
					<div class="m-qr">
						<img src="/image/qr-mp.jpg"/>
					</div>
					<div class="m-third">
						<div class="t-title">
							<span>内容还在以下平台发布：</span>
						</div>
						<div class="t-entry">
							<div class="e-item">
								<a href="//juejin.im/user/59b3684b6fb9a00a5d390576" target="_blank">
									<img src="/image/icon-juejin.png"/>
								</a>
							</div>
							<div class="e-item">
								<a href="//gitee.com/is-kyeteo" target="_blank">
									<img src="/image/icon-gitee.png"/>
								</a>
							</div>
							<div class="e-item">
								<a href="//www.toutiao.com/c/user/1859982725748219/#mid=1641544783205390"
								   target="_blank">
									<img src="/image/icon-toutiao.png"/>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="r-section r-section-login">
					<div class="l-title">
						<span>KYETEO - kyeteo.cn</span>
					</div>
					<div class="l-desc">
						<span>一个分享知识学习的地方</span>
					</div>
					<div class="l-form">
						<div class="f-item" @click="nav('/register')">
							<span>账号</span>
						</div>
						<div class="f-item" @click="nav('/register')">
							<span>密码</span>
						</div>
					</div>
					<div class="l-btn" @click="nav('/register')">
						<span>立即注册</span>
					</div>
					<div class="l-third">
						<div class="t-left">
							<span>第三方登陆：</span>
						</div>
						<div class="t-right">
							<div class="r-item">
								<i class="iconfont icon-weixin"></i>
							</div>
							<div class="r-item">
								<i class="iconfont icon-github"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="r-section r-section-tag">
					<div class="t-title">
						<span>热门标签</span>
						<span>查看全部</span>
					</div>
					<div class="t-content">
						<a
								class="c-item"
								:href="'/search?tagId=' + item.id"
								:key="key"
								v-for="(item, key) in home.tag"
						>
							<span>{{item.name}}</span>
						</a>
					</div>
				</div>
				<div class="r-section r-section-book">
					<div class="b-title">
						<div class="t-left">
							<span>专题</span>
						</div>
						<div class="l-right">
							<i class="iconfont icon-back"></i>
							<i class="iconfont icon-next"></i>
						</div>
					</div>
					<div class="b-content">
						<div class="c-item" :key="key" v-for="(item, key) in home.book">
							<a :href="'/book/' + item.id">
								<div class="i-cover">
									<img :src="item.cover | imgCover" alt/>
								</div>
								<div class="i-text">
									<div class="t-name">
										<span>{{item.title}}</span>
									</div>
									<div class="t-author">
										<span>{{item.user.nickname}}</span>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import apiArticle from '~/api/article'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import xHeader from '~/components/x-header'
    import xFooter from "~/components/x-footer"
    import toTop from "~/components/to-top"

    export default {
        head() {
            return {
                title: 'Kyeteo 一个分享知识的地方',
                meta: [
                    {hid: 'description', name: 'description', content: 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派'}
                ]
            }
        },
        async fetch({$axios, store, params}) {
            if (store.state.page.home.articles.form.index > 1) {
                return
            }
            await store.dispatch('page/getHome', {axios: $axios})
            await store.dispatch('page/getHomeTypes', {axios: $axios})
            await store.dispatch('page/getHomeArticles', {axios: $axios})
        },
        data() {
            return {
                qiniuBaseUrl: process.env.QINIU_BASE_URL
            }
        },
        computed: {
            ...mapState('page', ['home'])
        },
        components: {
            xHeader,
            xFooter,
            toTop
        },
        methods: {
            ...mapMutations('page', ['clearHomeArticle', 'changeHomeArticleType', 'changeHomeArticleSort']),
            ...mapActions('page', ['getHomeArticles']),
            changeType(o) {
                this.clearHomeArticle()
                this.changeHomeArticleType(o)
                this.getHomeArticles({axios: this.$axios})
            },
            changeSort(n) {
                this.clearHomeArticle()
                this.changeHomeArticleSort(n)
                this.getHomeArticles({axios: this.$axios})
            },
            getArticles() {
                this.getHomeArticles({axios: this.$axios})
            },
            doSearch(e) {
                this.nav('/search?keyword=' + e)
            }
        }
    }
</script>

<style lang="less">
	.index {
		background: #f4f5f5;
		
		.i-tab {
			position: fixed;
			top: 61px;
			left: 0;
			width: 100%;
			z-index: 999;
			background: white;
			box-shadow: 0px 0px 10px 0px rgba(2, 2, 2, 0.2);
			
			.t-wrap {
				display: flex;
				width: 960px;
				height: 46px;
				margin: 0 auto;
				
				.w-item {
					display: flex;
					align-items: center;
					padding-right: 10px;
					
					span {
						font-size: 14px;
					}
					
					&:not(:first-child) {
						padding-left: 10px;
					}
					
					&-active {
						span {
							color: #007fff;
						}
					}
					
					&:hover {
						cursor: pointer;
						color: #007fff;
					}
				}
			}
		}
		
		.i-main {
			display: flex;
			width: 960px;
			padding: 126px 0 30px 0;
			margin: 0 auto;
			
			.m-left {
				width: 700px;
				
				.l-articles {
					background: white;
					
					.a-tab {
						display: flex;
						align-items: center;
						height: 45px;
						box-sizing: border-box;
						padding: 0 20px;
						border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
						
						.t-item {
							span {
								font-size: 14px;
							}
							
							&-active {
								span {
									color: #007fff;
								}
							}
							
							&:not(:first-child) {
								position: relative;
								margin-left: 30px;
								
								&:before {
									position: absolute;
									content: "";
									top: 50%;
									transform: translateY(-50%);
									left: -15px;
									height: 70%;
									width: 1px;
									background: hsla(0, 0%, 59.2%, 0.2);
								}
							}
							
							&:hover {
								cursor: pointer;
								color: #007fff;
							}
						}
					}
					
					.a-list {
						.l-item {
							position: relative;
							padding: 15px 100px 15px 20px;
							list-style: none;
							
							.i-info {
								display: flex;
								align-items: center;
								
								span {
									position: relative;
									font-size: 14px;
									
									&:nth-child(1) {
										color: #007fff;
									}
									
									&:not(:first-child) {
										padding-left: 20px;
										color: #b2bac2;
										
										&::before {
											position: absolute;
											content: "/";
											top: 50%;
											transform: translateY(-50%);
											left: 10px;
										}
									}
								}
							}
							
							.i-name {
								display: flex;
								align-items: center;
								padding: 10px 0 15px 0;
								
								span {
									font-size: 16px;
									font-weight: 600;
									color: #333;
								}
							}
							
							.i-do {
								display: flex;
								align-items: center;
								
								.d-btns {
									display: flex;
									align-items: center;
									border: 1px solid #f4f5f5;
									
									.b-item {
										display: flex;
										align-items: center;
										justify-content: center;
										width: 55px;
										height: 24px;
										
										i {
											font-size: 16px;
										}
										
										&:last-child {
											border-left: 1px solid #f4f5f5;
										}
									}
								}
							}
							
							.i-cover {
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
								right: 20px;
								width: 70px;
								height: 70px;
								background-size: auto 100%;
							}
							
							&:hover {
								cursor: pointer;
								background-color: rgba(0, 0, 0, 0.01);
								
								.i-name {
									text-decoration: underline;
									text-decoration-color: #333;
								}
							}
						}
					}
					
					.a-more {
						padding: 30px;
						
						.m-wrap {
							display: flex;
							align-items: center;
							justify-content: center;
							height: 30px;
							background: #f4f5f6;
							
							&:hover {
								cursor: pointer;
							}
						}
					}
				}
			}
			
			.m-right {
				flex: 1;
				margin-left: 20px;
				
				.r-section {
					padding: 20px;
					background: white;
					
					&-mp {
						.m-title {
							span {
								font-size: 14px;
								font-weight: 600;
								color: #2e3135;
							}
						}
						
						.m-desc {
							padding-top: 10px;
							
							.d-item {
								span {
									font-size: 12px;
									color: #8f969c;
								}
							}
						}
						
						.m-qr {
							display: flex;
							justify-content: center;
							padding-top: 10px;
							
							img {
								width: 200px;
								height: 200px;
							}
						}
						
						.m-third {
							padding-top: 10px;
							
							.t-title {
								span {
									font-size: 14px;
									font-weight: 600;
									color: #2e3135;
								}
							}
							
							.t-entry {
								display: flex;
								align-items: center;
								padding-top: 10px;
								
								.e-item {
									width: 25px;
									height: 25px;
									
									img {
										width: 100%;
										height: 100%;
									}
									
									&:not(:first-child) {
										margin-left: 20px;
									}
								}
							}
						}
					}
					
					&-login {
						margin-top: 30px;
						
						.l-title {
							span {
								font-size: 14px;
								font-weight: 600;
								color: #2e3135;
							}
						}
						
						.l-desc {
							span {
								font-size: 14px;
								color: #8f969c;
							}
						}
						
						.l-form {
							padding: 10px 0;
							
							.f-item {
								display: flex;
								align-items: center;
								height: 36px;
								padding: 0 10px;
								box-sizing: border-box;
								border: 1px solid hsla(0, 0%, 59.2%, 0.2);
								border-radius: 3px;
								background: rgba(227, 231, 236, 0.2);
								
								&:not(:first-child) {
									margin-top: 10px;
								}
								
								&:hover {
									cursor: text;
								}
							}
						}
						
						.l-btn {
							display: flex;
							align-items: center;
							justify-content: center;
							height: 36px;
							box-sizing: border-box;
							border-radius: 3px;
							background: #007fff;
							
							span {
								color: white;
							}
							
							&:hover {
								cursor: pointer;
							}
						}
						
						.l-third {
							display: flex;
							align-items: center;
							padding-top: 10px;
							
							.t-left {
								flex-grow: 0;
							}
							
							.t-right {
								display: flex;
								align-items: center;
								flex: 1;
								
								.r-item {
									&:not(:first-child) {
										margin-left: 10px;
									}
								}
							}
						}
					}
					
					&-tag {
						margin-top: 30px;
						padding: 0;
						font-size: 14px;
						
						.t-title {
							display: flex;
							align-items: center;
							justify-content: space-between;
							height: 45px;
							padding: 20px;
							border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
							
							span {
								&:last-child {
									color: #007fff;
								}
							}
						}
						
						.t-content {
							display: flex;
							flex-wrap: wrap;
							padding: 20px;
							
							.c-item {
								display: flex;
								align-items: center;
								height: 30px;
								padding: 0 10px;
								margin: 0 10px 10px 0;
								border-radius: 15px;
								background: #f3f6f3;
								color: #515a6e;
								
								&:hover {
									cursor: pointer;
									background: #007fff;
									color: white;
								}
							}
						}
					}
					
					&-book {
						margin-top: 30px;
						padding: 0;
						font-size: 14px;
						
						.b-title {
							display: flex;
							align-items: center;
							justify-content: space-between;
							height: 45px;
							padding: 20px;
							border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
						}
						
						.b-content {
							.c-item {
								a {
									display: flex;
									padding: 20px 10px;
									
									.i-cover {
										flex-basis: 52px;
										height: 72px;
										
										img {
											width: 100%;
											height: 100%;
										}
									}
									
									.i-text {
										padding-left: 10px;
										
										.t-name {
											span {
												font-size: 14px;
											}
										}
										
										.t-author {
											display: flex;
											align-items: center;
											
											span {
												position: relative;
												color: #fc4544;
											}
										}
									}
								}
								
								&:hover {
									cursor: pointer;
									background-color: rgba(0, 0, 0, 0.01);
								}
							}
						}
					}
				}
			}
		}
	}
</style>


