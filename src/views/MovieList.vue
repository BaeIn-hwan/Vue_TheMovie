<template>
	<div class="movie-list">
		<section class="movie__section">
			<div class="movie__header">
				<h2 class="movie__title">
					<span>OO LIST</span>
				</h2>

				<div class="movie__filter">
					<ul class="movie__filter__box">
						<li class="movie__filter__list">
							<label class="movie__filter__label">
								<input type="radio" class="blind" name="popularFilter" value="popularity.desc">
								<span>인기도순</span>
							</label>
						</li>

						<li class="movie__filter__list">
							<label class="movie__filter__label">
								<input type="radio" class="blind" name="popularFilter" value="vote_average.desc">
								<span>평점순</span>
							</label>
						</li>

						<li class="movie__filter__list">
							<label class="movie__filter__label">
								<input type="radio" class="blind" name="popularFilter" value="title.desc">
								<span>타이틀순</span>
							</label>
						</li>
					</ul>
				</div>
			</div>

			<ListItemComponent :itemData="itemList" :loading="loading.itemListLoading" />
			<!-- <template v-if="loading.movieLoading == false">
				<div class="ladoing">로딩중..</div>
			</template>

			<template v-else-if="loading.movieLoading == true">
				<ul class="movie-layout__box">
						<li class="movie-layout__list" v-for="(item, index) in movieList" :key="index">
							<a href="#" class="movie-layout__list__link" @click.prevent="moveDetail($event, item.id);">
								<figure class="movie-layout__list__thumb">
									<img :src="$store.state.imgURL +'/w300_and_h450_face'+ item.poster_path" :alt="item.title">
									<span class="movie-layout__list__adult" v-if="item.adult">청불</span>
								</figure>

								<div class="movie-layout__list__info">
									<span class="movie-layout__list__title">
										{{item.title}}
									</span>
									<p class="movie-layout__list__desc" v-if="false">
										{{item.overview}}
									</p>
									<span class="movie-layout__list__open-date" v-if="false">
										개봉일 : {{item.release_date}}
									</span>
								</div>
							</a>
							<router-link :to="`/MovieDetail/`" ></router-link>

							<button type="button" class="movie-layout__list__preview">
								<span class="blind">미리보기</span>
							</button>
						</li>
				</ul>
			</template>

			<template v-else-if="loading.movieLoading == 'error'">
				오류입니다.
			</template> -->
		</section>
	</div>
</template>

<script>
import ListItemComponent from "@/components/ListItemComponent.vue";

export default {
	name: 'MovieList',
	components: {
		ListItemComponent
	},
	data() {
		return {
			listType: "movie",
			loading: {
        itemListLoading: false,
      },
			parameters: {
				itemListParam: {
					language: "ko",
					page: 1,
				}
			},
			itemList: [],
			alert: {
				isOpen: true,
				msg: ""
			}
		}
	},
	mounted() {
		this.requestitemList();
	},
	methods: {
		async requestitemList() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/discover/${this.listType}`,
					data: this.parameters.itemListParam
				});

				if (response.data && response.data.results && response.data.results.length) {
					this.loading.itemListLoading = true;
					this.itemList = response.data.results;
				}
				else {
					this.itemList = [];
				}
			}
			catch(e) {
				this.loading.itemListLoading = "error";
				console.error("error", e);
			}
		},
	}
}
</script>

<style lang="scss" scope>
</style>