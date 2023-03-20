<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         //\App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);

      

              $contactsubjects= [
              ["id" => "1","subject" => "Hajj and Umrah package inquiry","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "2","subject" => "Request for Hajj and Umrah travel information","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "3","subject" => "Hajj and Umrah booking or reservation","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "4","subject" => "Feedback on previous Hajj or Umrah trip","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "5","subject" => "Questions about Hajj or Umrah requirements","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "6","subject" => "Hajj or Umrah group booking inquiry","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "7","subject" => "Hajj or Umrah visa application inquiry","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "8","subject" => "Complaint or dispute related to Hajj or Umrah services","created_at" => "2023-02-21 13:20:16","updated_at" => null],
              ["id" => "9","subject" => "Others","created_at" => "2023-02-21 13:20:16","updated_at" => null]
              ];
              foreach($contactsubjects as $contactsubject){
              \App\Models\ContactSubject::create($contactsubject);
              }

              $posts= [ 
              [
              "id"=> 7,
              "title"=>
              " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              "content"=>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "attachment"=>
              "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",

              "user_id"=>1,
              ],

              [
              "id"=> 1,
              "title"=>
              " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum My Blog Post Title 1 My Blog Post Title 1 My Blog Post Title 1",
              "content"=>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "attachment"=> "/posts/1.jpg",
              "user_id"=>1,
              ],
              [
              "id"=> 2,
              "title"=> "My Blog Post Title 2",
              "content"=>
              "4 dfaf Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.4454Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

              "attachment"=> "/posts/2.jpg",
              "user_id"=>1,

              ],
              [
              "id"=> 3,
              "title"=> "My Blog Post Title 1",
              "content"=>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

              "attachment"=> "/posts/3.jpg",
              "user_id"=>1,
              ],
              [
              "id"=> 4,
              "title"=> "My Blog Post Title 1",
              "content"=>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

              "attachment"=> "/posts/4.jpg",
              "user_id"=>1,
              ],
              [
              "id"=> 5,
              "title"=> "My Blog Post Title 2",
              "content"=>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

              "attachment"=> "/posts/5.jpg",
              "user_id"=>1,
              ],
              [
              "id"=> 6,
              "title"=> "My Blog Post Title 1",
              "content"=>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

              "attachment"=> "/posts/6.jpg",
              "user_id"=>1,

              ]  ,
              ];
              foreach($posts as $post){
              \App\Models\Post::create($post);
              }


              $images= [ 
                ["image_url" =>"/gallery/1.jpg"],
                ["image_url" =>"/gallery/2.jpg"],
                ["image_url" =>"/gallery/3.jpg"],
                ["image_url" =>"/gallery/4.jpg"],
                ["image_url" =>"/gallery/5.jpg"],
                ["image_url" =>"/gallery/6.jpg"],
                ["image_url" =>"/gallery/7.jpg"],
                ["image_url" =>"/gallery/8.jpg"],
                ["image_url" =>"/gallery/9.jpg"],
                ["image_url" =>"/gallery/10.jpg"],
                ["image_url" =>"https://images.unsplash.com/photo-1675317047656-eb9ebd0eacc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"],           
              ];


          foreach($images as $image){
          \App\Models\Image::create($image);
          }


          $videos= [ 
            ["video_url" =>"https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4"],
            ["video_url" =>"https://www.youtube.com/embed/tgbNymZ7vqY"],
            ["video_url" =>"https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4"],
            ["video_url" => "https://www.youtube.com/embed/Mklo9VDZCNM"],
            ["video_url" =>"https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4"],
            ["video_url" =>"https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4"],
            ["video_url" =>"https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4"],           
     
          ];
          
          foreach($videos as $video){
            \App\Models\Video::create($video);
            }



            $HomeSliders= [ 
              ["image" =>"/homeslider/1.jpg"],
              ["image" =>"/homeslider/2.jpg"],
              ["image" =>"/homeslider/3.jpg"],
              ["image" =>"/homeslider/4.jpg"],
                        
       
            ];
            
            foreach($HomeSliders as $HomeSlider){
              \App\Models\HomeSlider::create($HomeSlider);
              }

              $pakages= [ 
                ["title"=>"INTERNATIONAL TRAVELS","description"=>"Our Travel Forum is truly unique, made to satisfy every client","days"=>"15-20","price"=>"","image" =>"https://media.istockphoto.com/id/482206266/photo/kaaba-in-mecca.jpg?s=612x612&w=0&k=20&c=wwzNu3XMQpCRVdAcBbeerUGaew0Fk2nGPQkH98Wj474="],
                ["title"=>"PASSPORT ASSISTANCE","description"=>"We have experienced and dedicated Passport Consultants.","days"=>"","price"=>"","image" =>"https://media.istockphoto.com/id/1409894360/photo/masjid-e-nabvi-saw.jpg?s=612x612&w=0&k=20&c=_a9WsTQeXJycpc_pOgDt8t_vQHRccRIQ-i1mGwQiqq8="],
                ["title"=>"TRAVEL CONSULTANT","description"=>"We will help you spend your quality time with your loved ones in entire journey","days"=>"","price"=>"","image" =>"https://media.istockphoto.com/id/483447487/photo/view-of-burj-al-arab-hotel-from-the-jumeirah-beach.jpg?s=612x612&w=0&k=20&c=LcOGt0oNvIuJauuOxARnR74dbF7X89pwPrNavFl0rKs="],
                ["title"=>"HAJJ","description"=>"Most Comfortable & satisfied service at very competitive price.","days"=>"45","price"=>"450000","image" =>"https://media.istockphoto.com/id/1129005214/photo/woman-at-the-airport.jpg?s=612x612&w=0&k=20&c=fCR5s7vuVwxvt8NCq2zzR9u08P_HBKguQ0lpjYrk370="],

                ["title"=>"CORPORATE TOURS","description"=>"We will arrange corporate tours for your employees.","days"=>"","price"=>"","image" =>"https://media.istockphoto.com/id/1140828971/photo/different-world-directions-signpost.jpg?s=612x612&w=0&k=20&c=SV_SrRCtdpVCUfZFhNZQhuanyF89IGr5_dqwEf_gdKo="],
                ["title"=>"UMRAH","description"=>"Guidance of Experts & Supervised under Ulama - Ikram.","days"=>"15-20","price"=>"95000","image" =>"https://media.istockphoto.com/id/1140618593/photo/aerial-view-of-sao-paulo-brazil-at-night.jpg?s=612x612&w=0&k=20&c=io-JGlcUbN7RhU3plNpYg6lFaJC-G31dT6wepqzocB8="],
         
              ];
              
              foreach($pakages as $pakage){
                \App\Models\HomePackageSlider::create($pakage);
                }


                $counters= [ 
                  ["counter_name" =>"INQUIRY","slug"=>"inquiry","counter"=>25],
                  ["counter_name" =>"OUR TEAM","slug"=>"our_team","counter"=>10],
                  ["counter_name" =>"SATISFIED CUSTOMER","slug"=>"satisfied_customer","counter"=>5],
                  ["counter_name" =>"YEARS OF SERVICE","slug"=>"years_of_service","counter"=>15],           
                ];
                            
                
                foreach($counters as $counter){
                  \App\Models\HomeCounter::create($counter);
                  }

                  $settings= [ 
                    ["title" =>"Logo","slug"=>"logo","description"=>"/logo/logo.png"],
                    ["title" =>"SLogo","slug"=>"slogo","description"=>"/logo/slogo2.png"],
                    ["title" =>"Footer About","slug"=>"footer_about","description"=>"Hajj and Umrah are Islamic pilgrimages to Mecca, with Hajj being mandatory and Umrah being optional. Service providers offer packages including transportation, accommodation, food, etc."],
                    
                  ];
                              
                  
                  
                  foreach($settings as $setting){
                    \App\Models\Setting::create($setting);
                    }

          
            }
}
