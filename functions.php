<?php

// =============================================================================
// FUNCTIONS.PHP
// -----------------------------------------------------------------------------
// Overwrite or add your own custom functions to X in this file.
// =============================================================================

// =============================================================================
// TABLE OF CONTENTS
// -----------------------------------------------------------------------------
//   01. Enqueue Parent Stylesheet
//   02. Additional Functions
// =============================================================================

// Enqueue Parent Stylesheet
// =============================================================================

add_filter( 'x_enqueue_parent_stylesheet', '__return_true' );


// function x_child_scripts() {
// 	wp_enqueue_script( 'x-child-js', get_stylesheet_directory_uri() . '/assets/js/main.js', array(), NULL, true );
// }
//add_action( 'wp_enqueue_scripts', 'x_child_scripts', 100 );


/*
 * => Allow field visibility options in Gravity Forms
 * ---------------------------------------------------------------------------*/
add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );


/*
 * => ADD PAGE SLUG TO BODY_CLASS() CLASSES IF IT DOESN'T EXIST (FROM ROOTS)
 * ---------------------------------------------------------------------------*/

function d3fy_body_class($classes) {
  // Add post/page slug
  if (is_single() || is_page() && !is_front_page()) {
    if (!in_array(basename(get_permalink()), $classes)) {
      $classes[] = basename(get_permalink());
    }
  }
  return $classes;
}
add_filter('body_class', 'd3fy_body_class');