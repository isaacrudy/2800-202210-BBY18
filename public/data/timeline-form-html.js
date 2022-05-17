<form id="timeline_create_form" action="/createTimeline" method="POST" enctype="multipart/form-data">
    <label class="timeline_image_label" for="timeline_image_uploader">
        <i class="fa fa-file-upload"></i>Select your file
    </label>
    <input id="timeline_image_uploader" name="timeline_image" type="file" accept="image/*" />
    <textarea id="timeline_content" name="content" type="text" placeholder="content" rows="4" cols="50"></textarea>
    <input id="timeline_add_btn" type="submit" value="submit button"></input>
</form>


