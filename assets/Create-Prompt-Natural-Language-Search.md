### Create a new Prompt Template:

- Connect to your Salesforce Org
- Setup > Prompt Builder
- Click "New Prompt Template"
  - Prompt Template Type: Flex
  - Name: Natural Language Search
  - API Name: Natural_Language_Search
  - Sources:
    - Name: User Query
    - API Name: User_Query
    - Source Type: Free Text

### Configure the Prompt Template:

- Open "Configuration" Panel
- Go to "Template Properties" tab:
  - Model Type: Standard
  - Models: GPT 4 Omni
- In the Prompt Template Workspace, enter the following prompt:

```
Your task is to select the products that best match a natural language query performed by a shopper on an online store, from the list of products below.

The list of products is below, in CSV format, where the first line are the headers:
ID,Product Name,Short Description,Price,Color Values,Size Values
25419334M,Long Sleeve Turtle Neck,Turtle neck tops are always great for cool days and never go out of style. Pair this turtle neck top with trousers and flats for a casual Friday office look.,£14.07,"Panama Khaki, Espresso",XL
25493613M,Long Center Seam Skirt,This long center seam skirt is stunning. It is perfect for nine-to-five and beyond.,£53.11,Zinc Heather,"4, 6, 8, 10, 12, 14, 16"
25493646M,Wide Waist Pencil Skirt,A classic skirt in salt-and-pepper tweed looks new again. Add the matching jacket for a perfect look from nine-to-five and beyond.,£48.63,Zinc Multi,"4, 6, 8, 10, 12, 14, 16"
25493657M,Long Sleeve Covered Placket Blouse,We took this classic silhouette and updated this blouse with a ruffle for an elegant look.,£39.67,Multi,"4, 6, 8, 10, 12, 14, 16"
25501785M,Wide Leg Pant,"Classically designed, this wide leg pant is perfect to pair with a great top!",£35.19,Sugar,"4, 6, 8, 10, 12, 14, 16"
25501802M,Textured Zip Front Cardigan,"Classically designed, this zip front textured cardigan is perfect to pair with a great bottom!",£53.11,Sugar,"S, M, L, XL"
25328702M,Washable Wool Classic Straight Skirt ,Make way for this effortless straight skirt. Add a blouse or suit jacket to complete your look.,£56.96,"Black, Navy","4, 6, 8, 10, 12, 14, 16"
25413129M,Long Sleeve Cardigan,Stick with classic looks this season and getting dressed will be a breeze. Long sleeve knit cardigan with a button closure. Add a button front top under your cardigan to create a polished look.,£31.35,Light Caraway Heather,"S, M, L, XL"
25419639M,Long Sleeve Turtleneck Top,During chilly days it's great to have this long sleeve basic cotton turtleneck. Long sleeve basic cotton turtle neck.,£9.59,"Panama Khaki, Plum Wine, Rose Garden","XS, S, M, L, XL"
25502603M,Lurex patterned Cardigan,"We love this new jacket replacement,perfect for pairing with skirts or slacks.",£53.11,Black Multi,"S, M, L"
22951021M,Classic Wrap,Our classic wrap is a must have for topping outfits.,£21.76,"Black, Ivory, Olive, Peridot, Sapphire, Violet",
25502692M,3/4 Sleeve Solid Drape Neck Sweater,"This drape neck top is a fresh take on formal,and an elevated spin on everyday.",£30.07,Carnation,"S, M, L, XL"
25050730M,Platinum Red Stripes Easy Care Fitted Shirt,Like our solid easy care shirts? Then you'll love our stripes too! This shirt also has built-in stretch for your comfort!,£48.00,White,"6, 10, 12, 14, 16"
25502038M,Flat Front Slim Pant,Our best selling slim pant with a tab waist and 2 back pockets is a must have wardrobe completer.,£47.35,Laurel,"4, 6, 8, 10, 12, 14, 16"
25502108M,Belted Boat Neck,Pair this 3/4 sleeve belted rib boat neck with one of our updated classic skirts.,£37.75,Laurel,"S, M, L, XL"
25502177M,Belted Cardigan,This is a great staple piece for your wardrobe! You can wear it open with a great tank or closed for a more career look.,£66.55,Chino,"S, M, L, XL"
25502296M,Shimmer Blouse,The added shimmer to this blouse makes it a perfect top for nine-to-five and beyond. The front seam detailing is a slenderizing touch!,£42.23,"Chino, Fennel","4, 6, 8, 10, 12, 14, 16"
25517766M,Cowl Neck Sweater,A cowl neck sweater with 3/4 in sleeves looks new again.,£44.16,"Black, Grey Heather, Light Seabreeze","S, M, L, XL"
25503110M,Long Sleeve Covered Placket Blouse,This is an incredibly feminine floral blouse.,£41.59,Brown,"4, 6, 8, 10, 12, 14, 16"
25503585M,Cowl Drape Sarong Dress,Look polished in this terrific tonal dress. It is perfect for desk to dinner!,£75.52,"Black, Pool","4, 6, 8, 10, 12, 14, 16"
25517823M,Long Sleeve Crew Neck,"Wear this long sleeve crew neck top alone, or pair it with a jacket for a classic look.",£9.59,"Black, Grey Heather, Meadow Violet, Begonia Pink, Fire Red, Sugar, White","XS, S, M, L, XL"
25518484M,Striped Shirt,We took this classic silhouette and updated this shirt with a mitered stripe for a slimming look.,£26.23,Royal Multi,"S, M, L, XL"
25501133M,Long Sleeve Dolman Wrap Cardigan,You'll love this dolman wrap with a bottom!,£33.91,Black & Sugar,"S, M, XL"
25050736M,Platinum Blue Stripes Easy Care Fitted Shirt ,Love our easy care solid shirting? Then give our stripes a try! This subtle blue stripe is a nice option to have in your closet for workplace wear and it even has a bit of stretch for extra comfort.,£63.99,White,"4, 6, 8, 10, 12, 14, 16"
25113204M,No-Iron Platinum Easy Care Sleeveless Fitted Shirt,"If you're a fan of our classic easy care fitted shirts, then you'll love the new sleeveless option! This is the same great quality and ease of care with a new look!",£37.76,"Light Blue, Pink, White","4, 6, 8, 10, 12, 14, 16"
25490259M,Hammered Gold Earrings,The best silver earrings to add a subtle but elegant look. ,£12.80,Brown,
25492705M,Hammered Silver Earrings,The best silver earrings to add a subtle but elegant look. ,£12.80,Worn Silver,
25493571M,Draped Cowl Neck,We took this classic cowl and updated it with this season's favorite colors.,£39.67,"Delft, Black, Ivory, Crocus","S, M, L, XL"
25517896M,Long Sleeve Classic Button Front Shirt,We took this classic silhouette and updated this shirt with a modern pattern.,£22.39,Black & Sugar,"S, M, L, XL"
25493665M,Rib Trim V-Neck Cardigan,Meet your new wardrobe favorite - a rib trim v-neck cardigan that works perfectly from nine-to-five and beyond!,£44.15,"Delft, Ivory","S, M, L, XL"
25518101M,Long Sleeve Embellished Boat Neck Top,We took this classic boat neck and updated it with scroll embroidery.,£18.55,"Begonia Pink, Grey Heather","S, M, L, XL"
25493717M,Beaded Jewel Neck Blouse,This is an updated version of our best selling. Pair it with a great jacket for a perfect look.,£44.15,Frost,"4, 6, 8, 10, 12, 14, 16"
25518174M,Button Front Crew Neck Cardigan,We took this classic cardigan and updated it with a modern scroll pattern.,£30.07,"Grey Heather Multi, Begonia Multi","S, M, L, XL"
25493728M,Sleeveless Scoop Neck Shell,We took this classic shell and updated it with this season's favorite colors.25502192M,Short Sleeve Shell,We took this classic shell and updated it with this season's favorite color.,£26.23,Crocus,"S, M, L, XL"
25502228M,Belted Cardigan With Studs,Our best selling cardigan is now updated with a detachable belt and studs. Pair it with a shell and it is great for nine-to-five and beyond.,£61.43,Laurel,"S, M, L, XL"
25518916M,Sleeveless Scoop Neck Shell,This best selling shell is a soft classic style. Pair it with the matching cardigan for a perfect look.,£21.75,Admiral Navy,"S, M, L, XL"
25502240M,Elbow Sleeve Ribbed Sweater,"Layer this sweater under a great cardigan, or wear it alone. Dress it up with a great piece of jewelry.",£42.23,Fennel,"S, M, L, XL"
25518921M,Paisley Notch Collar Button Down Shirt,"This paisley top is crisp, classic, and casually chic.",£28.15,Blue Fox Multi,"S, M, L, XL"
25518637M,Button Down Shirt,An object of our obsession! We love this Shirt. Pair it with a slim pant for slimming look!,£44.16,White,"XS, S, M, L, XL"
25518710M,Button Down Tunic,Classic button tunic with embroidered front. Pair with a great knit pant.25518769M,Straight Leg Pant,Finding the perfect pant has never been easier. This straight leg pant with a button on the side and light stretch material is great for every day wear.,£30.71,White,"S, M, L, XL"
25501623M,2 Button Pocket Jacket,A classic jacket in salt-and-pepper tweed looks new again. Add the matching pant for a perfect look from nine-to-five and beyond.,£84.47,Zinc Multi,"4, 6, 8, 10, 12, 14, 16"
25502154M,Belted Safari Jacket,This jacket is one of our all time favorite classic styles. Pair it with the matching skirt and a piece of great jewelry.,£95.35,Laurel,"4, 6, 8, 10, 12, 14, 16"
25589371M,Cable Knit Shell,We've updated our classic shell with a cable pattern. Grab a few for perfect outfit completers.,£44.16,"Black, Ivory","S, M, L, XL"
25589481M,Sleeveless Sheath Dress,We are obsessed with our updated classic sheath dress. This is our classic sheath dress in this season's latest print. Add a great piece of jewelry and you are ready for desk-to-dinner.,£66.55,Black Multi,"4, 6, 8, 10, 12, 14, 16"
25592434M,Straight Leg Pant,Our best selling straight leg pant is a must have wardrobe completer. We love the way it looks with a great top!,£50.56,White,"4, 6, 8, 10, 12, 14, 16"
25592443M,Straight Skirt,Make way for this effortless skirt. Add a blouse or suit jacket to complete your look.,£47.36,White,"4, 6, 8, 10, 12, 14, 16"
25629026M,Classic Jacket,Spring into a new season with this sleek and sophisticated classic two-pocket jacket.,£95.35,New Rattan,"4, 6, 8, 10, 12, 14, 16"
25629037M,V-Neck Jacket,Spring into a new season with this sleek and sophisticated classic back seamed two-pocket jacket.,£95.35,Black,"4, 6, 10, 12, 14, 16"
25696653M,Two Button Notch Collar Jacket.,A classic long sleeve jacket looks new again. Add the matching pant for a perfect look from nine-to-five and beyond. ,£114.56,White,"4, 6, 8, 10, 12, 14, 16"
25592452M,Floral Straight Skirt,Make way for this effortless floral skirt. Add a blouse or suit jacket to complete your look.,£47.36,Hot Pink Multi,"4, 6, 8, 10, 12, 14, 16"
25696693M,Pleated Skirt With Embroidery.,You will love this pleated skirt! It goes with everything! ,£95.36,Black,"4, 6, 8, 10, 12, 14, 16"
25589508M,Flat Front Classic Pant,Sharpen up your office style with this flat front classic fit pant.,£72.96,Bone,"4, 6, 10, 12, 14"
25592742M,Floral Slim Skirt,Make way for this effortless straight skirt. Add a blouse or suit jacket to complete your look.,£63.36,Stone Multi,"4, 6, 8, 10, 12, 14, 16"
25592827M,2 Pocket Trim Jacket,The simplicity and elegance of this jacket will amaze you. Its soft hand and classic shape make it just right for you.,£140.16,Keylime Multi,"4, 6, 8, 10, 12, 14, 16"
25642399M,Textured Zip Front Jacket,We are obsessed with our new textured zip front jacket. This new version of our stand collar jacket is perfect for nine-to-five and beyond.,£104.95,Ink Multi,"8, 10, 12, 14, 16"
25642436M,Floral Smock Tank Dress,Perfect dress for any occasion. Dress it up with great jewelry.,£44.16,Multi,"S, M, L, XL"
25589597M,Rainforest Shell,Our best selling shell has been updated with a rainforest pattern. Pair it with its matching cardigan and you are ready for the boardroom.,£47.36,Multi,"S, M, L, XL"
25592838M,Textured 2 Pocket Jacket,Our best selling textured jacket is new this year in this season's newest color. Wear the cuff folded upon down. Add a skirt and you will be set to go!,£120.96,"New Dill, Stone","4, 6, 8, 10, 12, 14, 16"
25592870M,Slim Skirt,A slim skirt is ultra feminine and forever timeless. Pair this with one of our cowl neck knit tops.,£63.36,Stone Multi,"4, 6, 8, 10, 12, 14, 16"
25589636M,No-Iron Easy Care Sleeveless Striped Shawl Collar Blouse,This classic no-iron easy care sleeveless blouse is perfect on it's own or under a jacket. It is truly a classic basic that is a must have in every wardrobe.,£30.71,White Multi,"8, 10, 12, 14"
25589753M,Pack-And-Go Dress,"What a perfect dress for business travel. Pack this mock wrap sleek knit dress in a suitcase, and it will pop out ready to wear.",£82.56,Black,"S, M, L, XL"
25592946M,Python Inspired Button Front Shirt,Smart shopping is investing in classic pieces that can be worn season after season. Start with this amazing blouse with lightweight lining and button closure.,£56.96,Stone Multi,"4, 6, 8, 10, 12, 14, 16"
25593024M,Classic Yoke Pant,The ultimate pant begins with great fit. This flat-front pant with yoked waist has a bit of stretch to add comfort and ease,£72.96,Slate Multi,"4, 6, 8, 10, 12, 14, 16"
25697133M,Cowl Neck Top,This basic top is a fashion do! This looks great with any bottom.,£56.96,"White, Black","S, M, L, XL"
25593066M,Floral Cardigan,Wear this over a classic shell with jeans for a perfect weekend look!,£69.76,Multi,"S, M, L, XL"
25593071M,Blouse with Tie Neck,This classic sleeveless blouse is perfect on its own or under a jacket. It is truly a classic basic that is a must have in every wardrobe.,£47.36,Slate Multi,"12, 16"
25688146M,5 Pocket Cuffed Capri,This dark wash capri pant works great for both warm days and nights. The five pockets and cuffed bottom gives the capri a classic but polished look.,£24.96,Rinse Wash New,"4, 6, 8, 10, 12, 14"
25697151M,Beaded Cardigan,Add instant glam to any summer outfit! Perfect for nine to five and beyond! ,£76.16,Black Multi,"S, M, L, XL"
25697184M,Sequined Animal Print Shell.,The best of both worlds; Animal print and sequined! ,£63.36,Black & White,"S, M, L, XL"
25590960M,Double Collar Striped Shirt,We've updated a basic short sleeve shirt with a double collar and cuffs. Pair it with a classic trouser and you are set to go!,£28.15,Cardinal Red & Black,"S, M, L, XL"
25590995M,Flat Front Slim Pant,Our flat front slim pant is perfect for every occasion. With its smooth front and back it will flatter you from every angle.,£35.19,"Black, Stone","4, 6, 8, 10, 12, 14, 16"
25593086M,Floral Ruffle Blouse,This floral ruffle front blouse is a favorite! It is a perfect outfit completer that is sure to turn heads.,£50.56,Stone Multi,"4, 6, 8, 10, 12, 14, 16"
25593154M,Short Sleeve Cardigan,Our best selling short sleeve cardigan has been updated with a metallic pattern. Pair it with its matching shell and you are ready for the boardroom.,£63.36,Cameo & Silver,"S, M, L, XL"
25688209M,Classic Denim Straight Leg Capri,Our favorite classic denim straight leg capri is updated in fresh-for-the-season hue with front and back pockets. This is that one perfect-fitting piece to anchor your wardrobe.,£37.76,"Black, Porcelain","4, 6, 8, 10, 12, 14, 16"
25688302M,Classic Fit Jean (Petite),Five pocket straight leg jean. Pair with a cardigan and flats for a casual Friday look.,£37.76,Porcelain,"4, 6, 8, 10, 12, 14, 16"
25593169M,Sleeveless Shell,Our best selling shell has been updated with a new color for the season. Pair it with its matching cardigan and you are ready for the boardroom.,£47.36,Ivory,"S, M, L, XL"
25593174M,Boat Neck Tunic,Pair with a great bottom for a perfect look. This can be dressed up or dressed down.,£69.76,Keylime Multi,"S, M, L, XL"
25688418M,3/4 Sleeve Button Front Cardigan,This cardigan is a must for your wardrobe! This will go great with a pair of jeans or with pair of dress pants. It has a hint of metallic in it so you feel glamorous all day!,£51.83,Ink & Silver,"S, M, L, XL"
25688443M,Floral Sundress,Floral dresses continue to be a fashion must have! You will love how easy it is to wear this dress.,£81.92,Ivory & Grape,"4, 6, 8, 10, 12, 14, 16"
25697294M,Sleeveless Cowl Neck Knit.,"Take it easy in our short sleeve cowl neck shirt, great for weekend wear. ",£47.36,Black,"S, M, L, XL"
25591149M,Floral Print Blouse,Take a floral pattern and update it in black and white. That gives you a perfect top for day or night.,£35.19,Black & White,"S, M, L, XL"
25593277M,Long Pencil Skirt,Long skirts are always a classic look; liven up this skirt with one of our amazing cardigans and matching tanks.,£56.96,Ink,"S, M, L, XL"
25688632M,Belted Fit and Flare.,We took our favorite belted dress and updated it with this great color! Pair with the ruffle cardigan for a great look! ,£81.92,"Black, Pansy","4, 6, 8, 10, 12, 14, 16"
25697368M,3/4 Sleeve Notch Cardigan.,A cardigan is this season's must have for chilly nights! ,£76.16,Black,"S, M, L, XL"
25697373M,Sleeveless Shell.,You will love this sleeveless shell alone or with it's matching cardigan. ,£50.56,Black Multi,"S, M, L, XL"
25591295M,Slim Pant,Finding the perfect pant has never been easier. This straight leg pant with coin pocket and light stretch material is great for office wear.,£47.35,Ink,"4, 6, 8, 10, 12, 14, 16"
25593363M,Classic Shell,Our best selling shell has been updated with a new color for the season. Pair it with its matching cardigan and you are ready for the boardroom.,£26.88,Cameo,"S, M, L, XL"
25695191M,Pink Quartz Necklace,"Commerce Cloud creates timeless classic jewelry that can be worn day or night. This amazing beaded necklace with wrapped design and toggle closure, is a sure way to update your wardrobe. ",£25.60,Gold,
25588985M,Textured Zip Front Jacket,We are obsessed with our new textured zip front jacket. This new version of our stand collar jacket is perfect for nine-to-five and beyond.,£119.03,Black,"4, 6, 8, 10, 12, 14, 16"
25589355M,Scoop Neck Shell,Our classic layering piece is perfect for any season. Wear it on its own or under a great jacket.,£37.76,"Black, Ivory, New Rattan","S, M, L, XL"
25589652M,Flat Front Pant,This classic pant is a must for every wardrobe. It's perfect from day-to-dinner.,£63.36,"Black, Cement, Ink","4, 6, 8, 10, 12, 14, 16"
25591617M,Scoop Neck Knit Top,Our classic layering piece is perfect for any season. Wear it on its own or under a great jacket.,£50.56,"White, Ink, Cerise","S, M, L, XL"
25591385M,2 Flap Pocket Jacket,We've updated our favorite jacket with a new color for the season. It's perfect for nine-to-five and beyond.,£99.83,Cerise,"4, 6, 8, 10, 12, 14, 16"
25591426M,Short Sleeve Belted Shirtdress,You will love the fit of this amazing belted shirtdress sleeveless dress. Add a necklace to complete this look.,£71.03,Ink,"4, 12, 14"
25695436M,Roll Sleeve Blouse.,This is a great top! 2 looks in one! You can wear it long sleeve or roll up the sleeve! ,£44.16,Chambray Blue,"S, M, L, XL"
25695441M,Short Sleeve Raglan Smock Shirt.,This short sleeve raglan smock shirt is fabulously updated with a contrasting print on the collar and cuffs. ,£44.16,Multi,"S, M, L, XL"
25589100M,One Button Jacket,Our best selling stand collar jacket is new this year in this seasons newest color. Wear the cuff folded upon down. Add a matching skirt and you will be set to go!,£99.83,Cobalt,"4, 6, 8, 10, 12, 14, 16"
25591530M,Zebra Scarf Print Cardigan,Dress up or dress down your favorite outfit with this zebra scarf print cardigan. Jewels look great from day-to-dinner.,£56.95,Ink Multi,"S, M, L, XL"
25591608M,Boat Neck Knit with Belt,"Crisp, classic and casually chic. Pair this boat neck with a great jacket.",£47.36,Surf,"S, M, L, XL"
25593727M,V-Neck Dress,We took our favorite v-neck dress and updated it with this great color! Pair with the ruffle cardigan for a great look!,£75.52,Black,"4, 6, 8, 10, 12, 14, 16"
25593800M,Floral V-Neck Dress,This floral v-neck dress is a must for your spring wardrobe! Perfect for work or play.,£81.92,Pink Multi,"4, 6, 8, 10, 12, 14, 16"
25695456M,Beaded 3/4 Sleeve Cardigan.,Add some fun to any outfit with this beaded 3/4 sleeve cardigan. ,£50.56,White,"S, M, L, XL"
25589139M,Classic Pant,"This classic pant, with a contour waist and 2 back besom pockets is a must for every wardrobe. It's perfect from day-to-dinner",£47.35,"Black, New Rattan","4, 6, 8, 10, 12, 14, 16"
25593301M,Washable Linen Slim Pant,Our flat front slim pant is perfect for every occasion. With its smooth front and back it will flatter you from every angle.,£56.96,"White, Black, Reed","4, 6, 8, 10, 12, 14, 16"
25591679M,Ruffle Cardigan,A great cardigan to have that will fit perfectly over any dress or outfit. Perfect for cool nights.,£31.36,Ivory,"S, M, L, XL"
25591862M,Stripe Walking Short,This contour waist striped pant is perfect for weekend wear. Pair it with a great top and your are set to go!,£37.76,Admiral Navy & White,"4, 6, 8, 10, 12, 14, 16"
25599642M,Bronze Clip On Button Earring,This classic styled button earring is the perfect way to add a little color to your wardrobe. ,£12.80,Silver Ox,
25599651M,Green and Brown Beaded Frontal Collar Bracelet,Green and Brown beads create a stunning effect on this silver metal bracelet with toggle closure. ,£23.04,Silver Ox,
25695601M,Floral Scoop Neck Tank.,We took this classic floral tank and updated it with this season's favorite colors ,£24.96,Multi,"XS, S, M, L, XL"
25589157M,Classic Glen Plaid Pant,"This classic glen plaid pant, with a contour waist and 2 back besom pockets is a must for every wardrobe. It's perfect from day-to-dinner",£51.83,Black & Ivory,"6, 10, 12, 14, 16"
25589173M,3/4 Sleeve Tee,Add this pleat neck tee to your day or evening wardrobe. It will look great on its own or under a fabulous jacket.,£37.75,Black,"S, M, L, XL"
25592300M,Cuffed Cargo Pant,Our best selling cargo pant is a must have wardrobe completer. We love the way it looks with a great top!,£47.36,White,"4, 6, 8, 10, 12, 14, 16"
25599659M,Silver and Purple Button Bracelet,Brighten your day with this silver and purple button bracelet. Pair with its matching necklace and enjoy them all year round. ,£24.32,Silver Ox,
25695696M,Drape Neck Tank with Knot Detail.,Look no further! This is the perfect casual top for any outfit ,£34.56,Multi,"S, M, L, XL"
25696521M,Sleeveless Sequined Top.,Add sparkle to your summer with this great sleeveless sequin top. ,£63.36,Chino Multi,"S, M, L, XL"
25589283M,Draped Neck Top,We've updated our classic draped neck top in this seasons newest color. Layer it under a great jacket for desk-to-dinner.,£50.56,Cobalt,"S, M, L, XL"
25592360M,Crew Neck Cardigan,Perfect for layering and always in style. Adorable crew neck classic 3/4 short sleeve cardigan.,£82.56,White,"S, M, L, XL"
25628995M,Show Stopper Dot Print Skirt,Our best selling skirt has been updated in a soft chiffon fabric in a polka dot pattern. It's perfect for nine-to-five and beyond.,£61.43,Black & Ivory,6
25696529M,Tweed Short Sleeve Jacket.,You will love to pair this jacket with great pant or skirt! Wear 9 to 5 and beyond! ,£120.96,New Coral Multi,"4, 6, 8, 10, 12, 14, 16"
25696598M,Long Printed Skirt.,You will love how easy this skirt is to wear! Wear it on your next night on the town! ,£95.36,Chino Multi,"4, 6, 8, 10, 12, 14, 16"
25589335M,Ruffle Front Cardigan,Our newest ruffle front cardigan is a terrific layering piece for skirts or slacks. It is a great style to wear for day thru evening.,£56.96,"Black, New Rattan","S, M, L, XL"
25589397M,Classic Print Blouse,Wow! This is a show stopper! We've updated our classic button down blouse in this season's latest print. Add a great piece of jewelry and you are ready for desk-to-dinner.,£42.23,New Rattan Multi,"4, 8, 12, 16"
25592386M,Floral Tie Front Shirt,Our floral print tie shirts are always a best seller. This floral shirt is both fashionable and sophisticated.,£40.96,Hot Pink Combo,"S, M, L, XL"
25593016M,Classic Pant,Our classic pant is perfect for every occasion. With its smooth front and back it will flatter you from every angle.,£72.96,Slate,"8, 10, 14"
25593032M,Zip Front Jacket,Impeccably styled zip front jacket. This item is great for work and can even be worn casually with dark denim.,£140.16,Slate Multi,"4, 6, 8, 10, 12, 14, 16"
25697156M,Beaded Shell.,Wear alone or add the beaded cardigan for a perfect look! ,£50.56,Black Multi,"S, M, L, XL"
25697699M,Open Cardigan.,Cardigans are a wonderful layering pieces that work with everything. Pair with a classic pant or skirt. ,£63.36,White,"S, M, L, XL"
25591704M,Blurred Leaf Floral Wrap Dress,Look fabulous for any occasion with this printed tie front sheath dress. Pair with a great piece of jewelry.,£101.12,Ivory Multi,"4, 6, 8, 10, 12, 14, 16"
25593111M,V-Neck Jacket,Dress up any outfit with this v-neck jacket. Perfect for any occasion.,£133.76,Stone,"6, 8, 12, 14, 16"
25688482M,Sleeveless Twist Neck Blouse,Wow! This sleeveless twist neck blouse looks great with the crochet cardigan! A great way to get noticed at the office!,£47.36,Light Grey,"6, 8, 10, 12, 14, 16"
25697161M,Sleeveless Cowl Neck Knit.,"Take it easy in our short sleeve cowl neck shirt, great for weekend wear. ",£50.56,Multi,"S, M, L, XL"
25720016M,Worn Gold Curved Earring,An Instant in glam; pair with matching bracelet for a perfect look! ,£11.52,Gold,
25697800M,Pleated Dress With Front Sash.,The Pleated dress is a classic style that looks amazing on all shapes and sizes. ,£82.56,Admiral Navy,"4, 6, 8, 10, 12, 14, 16"
25744346M,Dart Dress With Velvet Trim,This classic dress is perfect for day into evening.,£88.32,Black & White,"4, 6, 8, 10, 12, 14, 16"
25591911M,Floral Sheath Dress,This great cotton sheath dress has a flattering boat neckline and gorgeous print to welcome back the warm weather!,£69.76,Surf Spray & Navy,"4, 6, 8, 10, 12, 14, 16"
25591979M,Golf Short,Enjoy these shorts with back flap pockets as the hot weather arrives! These can be worn with a tee or tank!,£37.76,Navy Combo,"4, 6, 8, 10, 12, 14"
25688507M,Sleeveless Zebra Print Blouse,This is a must have for your wardrobe! The animal print decorates this great blouse and adds an extra glam touch. Perfect under a cami for a night out!,£35.19,Ink & White,"6, 8, 10, 12, 14"
25688523M,Short Sleeve Wrap Blouse with Tie Front,This short sleeve wrap blouse with tie front is a show stopper on its own or pair under a jacket for an amazing look!,£69.76,Slate Multi,"12, 14, 16"
25720029M,Double Hoop Clip On Earring,These clip on double hoop earring dresses up any outfit with ease and perfection. ,£17.92,Gold,
25720050M,Infinity Stretch Worn Silver Bracelet,Dress any outfit up with this stretch bracelet in worn silver. ,£25.60,Silver,
25697739M,Sleeveless Ruffle Blouse.,Update your wardrobe with this ruffle sleeveless shirt. Add a new piece of jewelry and you will look fabulous ,£40.96,White,"S, M, L, XL"
25697748M,3/4 Sleeve Pleated Tunic,"If you are looking for something to wear as the weather warms up, this tunic will be perfect.",£56.96,Tropical Blue Combo,"S, M, L, XL"
25592075M,Safari Jacket,This jacket is one of our all time favorite classic styles. Pair it with the matching skirt and a piece of great jewelry.,£95.36,Surf Spray,"S, M, L, XL"
25688608M,Floral Shirt Dress.,We took our favorite cargo shirt dress and updated it with a floral pattern. Perfect for 9 to 5 and beyond! ,£94.72,Ivory Multi,"4, 6, 8, 10, 16"
25720054M,Cluster Drop Earring,Drop earring with beautiful greens and blues stones with silver beads. ,£16.64,Silver,
25720061M,Pink and Gold Cluster Drop Earring,The perfect accessory starts with an amazing earring and ends with a complete look. ,£16.64,Pink,
25762724M,Hooded Trench Coat,You will love this trench coat! It is so cute! The pleats in the back make it ultra feminine!,£115.20,Flax,"S, M, L, XL"
25592200M,Floral V-Neck Dress,This v-neck dress is a must for your spring wardrobe! This dress will make you feel stylish at any occasion.,£81.92,Pool Multi,"4, 6, 8, 10, 12, 14, 16"
25592211M,Black And White V-Neck Floral Dress,Floral patterns are so popular this time of year! We love the new black and white pattern.,£81.92,Ivory & Black,"4, 6, 8, 10, 12, 14, 16"
25695189M,Pink Quartz Hoop Earring,The perfect accessory starts with an amazing earring and ends with a complete look. ,£20.48,Gold,
25720063M,Blue and Gold Clip On Earring,Brighten your day with this beautiful blue and gold dangle earring. Enjoy them all year round. ,£15.36,Blue,
25720074M,Green and Gold Necklace,"Commerce Cloud creates timeless classic jewelry that can be worn day or night. This amazing beaded necklace with wrapped design and toggle closure, is a sure way to update your wardrobe. ",£23.04,Green,
25593119M,Washable Linen 1 Button Jacket,We took our best selling jacket and updated it with a new color for the season. Start showing off!25593647M,Flower Embellishment Tee,What a great casual shirt. You will love the way this looks! Pair with a pant for a great look!,£95.36,"White, New Dill","4, 6, 8, 10, 12, 14, 16"
25592295M,3/4 Sleeve Button Down Shirt,What a great casual shirt. You will love the way this looks! Pair with a pant for a great look!,£50.56,White,"S, M, L, XL"
25592309M,Long Walking Short,Enjoy these shorts as the hot weather arrives! These can be worn with a tee or tank!,£31.36,Tundra,"4, 6, 8, 10, 12, 14"
25695217M,Shirred Front Tank.,Pair this with a great bottom and jewelry for a perfect look! ,£24.96,White,"XS, S, M, L, XL"
25695231M,Drape Front Cardigan.,We've updated our classic cardigan with an open draped front. We've added a little length for a new look ,£37.76,White,"XS, S, M, L, XL"
25720076M,Pink and Gold Necklace,"Commerce Cloud creates timeless classic jewelry that can be worn day or night. This amazing beaded necklace with wrapped design and toggle closure, is a sure way to update your wardrobe. ",£23.04,Pink,
25720078M,3 Strand Drop Necklace,Vintage inspired with an irresistibly modern twist. This chic necklace features strands of burnished chains accented with green and gold dangle stones. ,£23.04,Blue,
25697544M,Stripe Button Down Shirt.,This Striped Button Down Shirt is an incredibly versatile blouse. We love it from nine-to-five and beyond. ,£40.96,LIght Pink Gem Combo,"S, M, L, XL"
25593249M,Long Pleated Skirt,Our best selling classic skirt is updated with stripes at the bottom for the season!,£76.16,Ink & White,"S, M, L, XL"
25695242M,Double Layer Tank Top.,Pair this double layer tank top with a cardigan or wear alone for a perfect look! ,£37.76,Bright Raspberry and White,"XS, S, M, L, XL"
25695305M,Crochet Yoke Tank.,This tank is a great addition to your closet! The crochet makes it look so feminine! ,£28.16,Spa Blue Multi,"S, M, L, XL"
25720115M,Classic Capri with Button Detail,This capri is perfect for weekend wear! You will enjoy the button detail on the pockets.,£31.36,Classic,"4, 6, 8, 10, 12, 14, 16"
25593254M,Sleeveless Belted Cowl Neck Dress,This sleeveless belted cowl neck dress is figure flattering and great with heels. Pair with a piece of jewelry for a perfect look.,£76.16,Ink,"S, M, L, XL"
25593355M,Long Ruffle Skirt,Wow! You will turn heads in this long ruffle skirt. Add a matching top and you are ready for desk-to-dinner.,£82.56,Multi,"4, 6, 8, 10, 12, 14, 16"
25592378M,Drape Neck Top,We've updated our classic draped neck top in this seasons newest color. Layer it under a great jacket for desk-to-dinner.,£63.36,Dark Stone,"S, M, L, XL"
25695327M,Embroidered Boat Neck Top.,This shirt is classic alone or under a cardigan. Pair with a pant for a perfect look! ,£28.16,White,"S, M, L, XL"
25695392M,Capri Utility Pant.,This capri utility pant is perfect for weekend wear. Pair it with a great top and your are set to go! ,£44.16,Birch,"4, 6, 8, 10, 12, 14, 16"
25593380M,Square Neck Shell,Our best selling shell has been updated with a new color for the season. Pair it with its matching cardigan and you are ready for the boardroom.,£28.16,Cameo,"S, M, L, XL"
25593429M,Washable Linen Classic Yoke Pant,The ultimate pant begins with great fit. This flat-front pant with yoked waist has a bit of stretch to add comfort and ease.,£56.96,"Black & White, Stone and White","4, 6, 8, 10, 12, 14, 16"
25688156M,5 Pocket Cuffed Capri,This dark wash capri pant works great for both warm days and nights. The five pockets and cuffed bottom gives the capri a classic but polished look.,£31.36,"Black, Porcelain, Buttermilk","4, 6, 8, 10, 12, 14, 16"
25592479M,Neutral Floral Dress,Great new dress for the warmer weather! Perfect for any occasion!,£82.56,Dark Stone,"4, 6, 8, 10, 12, 14"
25592509M,Pleated Shell,We updated our favorite shell with a new color for the season! You will love the way looks.,£40.96,Hot Pink,"S, M, L, XL"
25697176M,No-Iron Easy Care Double Strip Sleeveless Blouse,"You'll love this updated easy care shirt in a roomy and breathable sleeveless body! You can layer it under suits and jackets for a formal and fitted look, or shed those layers for a more casual statement. ",£41.60,White Multi,"4, 6, 8, 10, 12, 14, 16"
25697194M,Ribbed Cardigan.,A perfect outfit solution is the cardigan! ,£63.36,"Ivory, New Coral","S, M, L, XL"
25593485M,Ribbed Shell,Our best selling shell has been updated with a new color for the season. Pair it with its matching cardigan and you are ready for the boardroom.,£44.16,"New Dill, Stone","S, M, L, XL"
25593676M,Sleeveless Tank,Wear alone or layer with a cardigan for a perfect look!,£31.36,White,"S, M, L, XL"
25688228M,Light Weight Cargo Capri,This light weight cargo capri is so versatile and would look great at any casual setting. The side pockets and tie string bottom give the capri a classic cargo look.,£31.36,"Black, Rustic Peach, Lazy Dazy","4, 6, 8, 10, 12, 14, 16"
25592518M,Button Front Shirt,What a great casual shirt. The sleeves roll up for a second look. You will love the way this looks! Pair with a pant for a great look!,£47.36,"White, Hot Pink","S, M, L, XL"
25695701M,Ruffle Sleeveless Blouse.,This shirt adds an updated look to any outfit. You will love the ruffle collar. ,£40.96,Dark Pink Gem,"S, M, L, XL"
25697266M,Sleeveless Twist Front Knit Top.,This sleeveless twist front knit top will become this seasons go -to piece. This looks great with any bottom! ,£40.96,Chino,"S, M, L, XL"
25697279M,Belted Short Sleeve Knit Top.,Ivory looks great with black pants! Dress up with jewelry. ,£47.36,Ivory,"S, M, L, XL"
25594776M,Floral Luxe Scarf,Feminine and Flirty! This floral luxe scarf is a great addition to your new spring wardrobe!,£21.76,"Imperial, Red",
25592590M,Full Skirt,This stylish full skirt offers a sophisticated look in a great fabric as well. Add a floral printed tank to brighten up this look for spring.,£69.76,Tundra,"4, 6, 8, 10, 12, 14, 16"
25696540M,Jewel Neck Jacket.,A jewel neck jacket is just what the busy professional woman needs. You don't have to sacrifice great fit and quality for comfort! ,£114.56,Chino & Ivory,"4, 6, 8, 10, 12, 14, 16"
25696559M,Classic 2 Button Pant.,A classic 2 button pant is just what the busy professional woman needs. You don't have to sacrifice great fit and quality for comfort! ,£72.96,Chino & Ivory,"4, 6, 8, 10, 12, 14, 16"
25697378M,Sleeveless Scoop Neck Shell.,You will love this sleeveless shell alone or with it's matching cardigan. ,£37.76,Black,"S, M, L, XL"
25697387M,Boat Neck Sleeveless Sheath Dress.,"This sleeveless sheath dress is a classic piece for your suiting collection year round. Matched with any suit jacket, solid or patterned, you look professional and sharp. Create a feminine and soft look sporting this piece on its own or with a colorful wrap. ",£76.16,Black,"S, M, L, XL"
25594785M,Multi Color Scarf,Don't leave home without it! This multi color scarf brings instant style to any outfit!,£24.32,Green,
25599632M,Pink and Gold Hoop Earring,Pink and a bit of worn gold in this simply elegant hoop earring. ,£19.20,Gold,
25592604M,Embellished Boat Neck Tee,What a great casual shirt. You will love the way this looks! Pair with a pant for a great look!,£56.96,White,"S, M, L, XL"
25592613M,Slim Capri,Perfect capri for weekends. Pair with a top for a perfect look.,£47.36,White,"4, 6, 8, 10, 12, 14, 16"
25696614M,Short Sleeve Printed Blouse.,We took this classic silhouette and updated this blouse with a new print for an elegant look. ,£63.36,Chino Multi,"4, 6, 8, 10, 12, 14, 16"
25696630M,Mixed Media Dress.,This dress is truly amazing! We love this dress and so will you! Be the talk of your next get together! ,£101.76,Chino Multi,"4, 6, 8, 10, 12, 14, 16"
25697499M,Pleated Jacket.,Time to update your assortment with this great suit jacket. You will love its easy fit and classic look. ,£88.96,"Black, White","4, 6, 8, 10, 12, 14, 16"
25599638M,Pink and Brown Slip On,"Pink, brown and a bit of worn gold in this simply slip on elegant necklace. ",£43.52,Gold,
25599647M,Silver Chandler Earring,Dress up any outfit with these silver chandler earring. The light green and brown beads add a little bit of color for a perfect look. ,£19.20,Silver Ox,
25592653M,Ruffle Sleeveless Shirt,Update your wardrobe with this ruffle sleeveless shirt. Add a new piece of jewelry and you will look fabulous.,£40.96,"White, Coral Sun","S, M, L, XL"
25696638M,Cap Sleeve Wrap Dress.,Spice up your dress collection with the wrap dress that can take you from day to night. This wrap dress is perfect for any event. ,£95.36,Chino,"4, 6, 8, 10, 12, 14, 16"

Requirements:
- Do not output a product if you are not confident it matches the shopper's intent.
- If the shopper requests a particular type of product, apply the request strictly. For exemple, if the shopper asks for "tops", return only tops, not accessories.
- If the shopper asks for colors, try to match similar tones among those listed under "Color Values".
- If the shopper asks for criteria on price, apply the criteria strictly.

Give your response in JSON, with the following keys:
- "products": contains an array of strings containing the matching products ID's.
- "text": a 1 or 2-sentence summary of the matching products and how they answer the customer query, in the first person. Do not repeat the product name and description verbatim.

For example:
{
  "products": <array of product IDs>,
  "text": <summary>
}

The shopper's query is:
{!$Input:User_Query}
```

- Save and Activate
