<template>
  <div>
    <v-card :max-width="$vuetify.breakpoint.xs? '80vw':'400'">
      <div :style="$vuetify.breakpoint.xs? 'width:80vw; height:80vw':'width:400px; height:400px'">
        <v-img
        :src="recipeImageURL"
        alt="no image found"
      ></v-img>
      </div>

      <v-card-title style="word-break: break-word"> {{ recipeName }}</v-card-title>

      <v-card-subtitle class="ml-3">
        <div>
          <v-row>
            <v-icon
              v-if="recipeCategory === 'Vegan'"
              color="green"
              class="mr-2"
            >
              mdi-leaf
            </v-icon>
            <v-icon v-else>mdi-leaf-off</v-icon>
            <v-icon class="ml-3 mr-2">mdi-account-group</v-icon>
            <span>1~2</span>
          </v-row>
        </div>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="orange lighten-1" text @click="show = !show"> Explore </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-col class="text-center mx-auto" cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span
                    ><v-icon class="mr-2">mdi-map-marker-radius</v-icon
                    >Origin</span
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ recipeOrigin }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span
                    ><v-icon class="mr-2">mdi-format-list-checks</v-icon
                    >Category</span
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ recipeCategory }}
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span
                    ><v-icon class="mr-2">mdi-playlist-edit</v-icon>Ingredients
                    and Measures</span
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ul>
                    <v-list-item
                      v-for="(ingredientAndMeasure, i) in recipeIngredientsAndMeasures"
                      :key="i"
                    >
                      <v-list-item-content class="justify-center">
                        {{ ingredientAndMeasure }}
                      </v-list-item-content>
                    </v-list-item>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span
                    ><v-icon class="mr-2">mdi-information-outline</v-icon
                    >Instructions</span
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content style="word-break: break-word">
                  {{ recipeInstructions }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel
                v-if="recipeCookingVideoURLForIframe"
              >
                <v-expansion-panel-header>
                  <span
                    ><v-icon class="mr-2">mdi-video</v-icon>Cooking Video</span
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container>
                    <div
                      style="
                        position: relative;
                        width: 100%;
                        padding-bottom: 56.25%;
                      "
                    >
                      <iframe
                        style="
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 100%;
                        "
                        :src="recipeCookingVideoURLForIframe"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: mapGetters([
      'recipeImageURL','recipeName','recipeCategory','recipeOrigin','recipeIngredientsAndMeasures','recipeInstructions','recipeCookingVideoURLForIframe'
    ])
};
</script>


