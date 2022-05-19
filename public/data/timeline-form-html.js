<form id="timeline_create_form" action="/createTimeline" method="POST" enctype="multipart/form-data">
    <h2>Create post</h2>
    <div class="image_uploader_container">
        <label class="timeline_image_label" for="timeline_image_uploader">
            <i class="fa fa-file-upload"></i>Select your file
        </label>
        <input id="timeline_image_uploader" name="timeline_image" type="file" accept="image/*" />
    </div>
    <textarea id="timeline_content" name="content" type="text" placeholder="This box needs your timeline text!" rows="4" cols="50"></textarea>
    <input id="timeline_add_btn" type="submit" value="Post"></input>
</form>