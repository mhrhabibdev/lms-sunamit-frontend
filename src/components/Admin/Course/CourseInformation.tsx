"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// import { CourseInfoType } from "@/type";
import { useState, DragEvent, ChangeEvent, useRef } from "react";

type CourseInfoType = {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
};

type Props = {
  courseInfo: CourseInfoType;
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseInfoType>>;
  active: number;
  setActive: (active: number) => void;
};

export default function CourseInformation({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(courseInfo.thumbnail || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useForm setup with validation
  const form = useForm<CourseInfoType>({
    defaultValues: courseInfo,
    mode: "onChange", // Validate on change to show errors immediately
  });

  // Handle submit
  const onSubmit = (data: CourseInfoType) => {
    // Set thumbnail as Data URL if file uploaded
    if (thumbnailFile && preview) {
      data.thumbnail = preview;
    }
    
    setCourseInfo(data);
    setActive(active + 1); // go to next step
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => setDragging(false);
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFile(file);
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleFile = (file: File) => {
    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      // Update form value
      form.setValue('thumbnail', reader.result as string, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  // Handle click on the upload area to trigger file input
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setThumbnailFile(null);
    setPreview(null);
    form.setValue('thumbnail', '', { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-center">Course Information</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Course Name - Required */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Course name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description - Required */}
          <FormField
            control={form.control}
            name="description"
            rules={{ 
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter course description"
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price - Required */}
          <FormField
            control={form.control}
            name="price"
            rules={{ 
              required: "Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Please enter a valid price"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estimated Price - Optional */}
          <FormField
            control={form.control}
            name="estimatedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Price (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter estimated price" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Tags - Required */}
          <FormField
            control={form.control}
            name="tags"
            rules={{ 
              required: "Tags are required",
              minLength: {
                value: 2,
                message: "Please enter at least one tag"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., programming, web development" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Level - Required */}
          <FormField
            control={form.control}
            name="level"
            rules={{ 
              required: "Level is required",
              validate: (value) => 
                ["Beginner", "Intermediate", "Advanced"].includes(value) || 
                "Please enter a valid level (Beginner, Intermediate, or Advanced)"
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Beginner, Intermediate, Advanced" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Demo URL - Required */}
          <FormField
            control={form.control}
            name="demoUrl"
            rules={{ 
              required: "Demo URL is required",
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Please enter a valid URL"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/demo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail Upload - Required */}
          <div className="space-y-2">
            <FormLabel>Thumbnail *</FormLabel>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadAreaClick}
              className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
                dragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
              } ${
                form.formState.errors.thumbnail ? "border-red-500" : ""
              }`}
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={preview}
                    alt="Thumbnail Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="text-gray-600 mb-2">
                    Drag & Drop thumbnail here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, WebP (Max 5MB)
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="text-xs text-gray-500 mt-1">
              {thumbnailFile ? `Selected: ${thumbnailFile.name}` : 'No file selected'}
            </div>
            {form.formState.errors.thumbnail && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Hidden field to store thumbnail data with validation */}
          <FormField
            control={form.control}
            name="thumbnail"
            rules={{ required: "Thumbnail is required" }}
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="px-6"
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}