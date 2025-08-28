/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CourseContent({
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
  active,
  setActive,
}: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isEditingSection, setIsEditingSection] = useState<number | null>(null);

  const form = useForm({
    defaultValues: courseContentData[0],
    mode: "onChange",
  });

  const handleCollapseToggle = (index: number) => {
    // Validate current content before collapsing
    if (openIndex === index) {
      const currentItem = courseContentData[index];
      if (!currentItem.title || !currentItem.url || !currentItem.videoSection) {
        toast.error("Please complete all required fields before collapsing");
        return;
      }
      
      // Validate all links in this section
      const hasInvalidLinks = currentItem.links.some((link: any) => 
        !link.title || !link.url
      );
      
      if (hasInvalidLinks) {
        toast.error("Please complete all link fields before collapsing");
        return;
      }
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAddContent = () => {
    // Check if current content is complete
    if (openIndex !== null) {
      const currentItem = courseContentData[openIndex];
      if (!currentItem.title || !currentItem.url || !currentItem.videoSection) {
        toast.error("Please complete all required fields before adding new content!");
        return;
      }
      
      // Validate all links in this section
      const hasInvalidLinks = currentItem.links.some((link: any) => 
        !link.title || !link.url
      );
      
      if (hasInvalidLinks) {
        toast.error("Please complete all link fields before adding new content!");
        return;
      }
    }

    const lastSection = courseContentData[courseContentData.length - 1].videoSection;
    const newContent = {
      url: "",
      title: "",
      suggestion: "",
      videoSection: lastSection,
      links: [{ title: "", url: "" }],
    };
    setCourseContentData([...courseContentData, newContent]);
    setOpenIndex(courseContentData.length);
    toast.success("New content added to current section");
  };

  const handleAddSection = () => {
    // Check if current content is complete
    if (openIndex !== null) {
      const currentItem = courseContentData[openIndex];
      if (!currentItem.title || !currentItem.url || !currentItem.videoSection) {
        toast.error("Please complete all required fields before adding a new section!");
        return;
      }
      
      // Validate all links in this section
      const hasInvalidLinks = currentItem.links.some((link: any) => 
        !link.title || !link.url
      );
      
      if (hasInvalidLinks) {
        toast.error("Please complete all link fields before adding a new section!");
        return;
      }
    }

    const newSection = {
      url: "",
      title: "",
      suggestion: "",
      videoSection: `New Section ${courseContentData.filter((item: any) => 
        item.videoSection.startsWith("New Section")
      ).length + 1}`,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newSection]);
    setOpenIndex(courseContentData.length);
    toast.success("New section created!");
  };

  const handleDeleteContent = (index: number) => {
    if (index === 0) return;
    
    const itemToDelete = courseContentData[index];
    setCourseContentData(courseContentData.filter((_: any, i: number) => i !== index));
    
    // If we're deleting the currently open item, close it
    if (openIndex === index) {
      setOpenIndex(null);
    } else if (openIndex !== null && openIndex > index) {
      // Adjust openIndex if we deleted an item before it
      setOpenIndex(openIndex - 1);
    }
    
    toast.success(`"${itemToDelete.title || 'Untitled content'}" deleted`);
  };

  // Handle next button click with validation
  const handleNext = () => {
    // Validate all content items
    const hasEmptyFields = courseContentData.some((item: any) => 
      !item.title || !item.url || !item.videoSection
    );
    
    if (hasEmptyFields) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }
    
    // Validate all links
    const hasInvalidLinks = courseContentData.some((item: any) => 
      item.links.some((link: any) => !link.title || !link.url)
    );
    
    if (hasInvalidLinks) {
      toast.error("Please complete all link fields before proceeding");
      return;
    }

    // Submit the form data
    handleCourseSubmit();
    
    // Move to next step
    setActive(active + 1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Course Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            {courseContentData?.map((item: any, index: number) => {
              const showSectionInput =
                index === 0 ||
                item.videoSection !== courseContentData[index - 1].videoSection;

              return (
                <Collapsible
                  key={index}
                  open={openIndex === index}
                  onOpenChange={() => handleCollapseToggle(index)}
                  className={`w-full border rounded-lg p-4 ${
                    showSectionInput ? "mt-6" : "mb-0"
                  }`}
                >
                  {/* Section Title */}
                  {showSectionInput && (
                    <div className="mb-4 flex items-center">
                      {isEditingSection === index ? (
                        <FormField
                          control={form.control}
                          name={`courseContentData.${index}.videoSection`}
                          rules={{ required: "Section title is required" }}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Section Title *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter section title"
                                  value={item.videoSection}
                                  onChange={(e) => {
                                    const updatedData = [...courseContentData];
                                    updatedData[index].videoSection =
                                      e.target.value;
                                    setCourseContentData(updatedData);
                                  }}
                                  onBlur={() => setIsEditingSection(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      setIsEditingSection(null);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">
                            {item.videoSection || "Untitled Section"}
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditingSection(index)}
                          >
                            <FaRegEdit className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {index + 1}.
                      </span>
                      <p
                        className={
                          openIndex !== index ? "font-medium" : "hidden"
                        }
                      >
                        {item.title || "Untitled Video"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={index === 0}
                        onClick={() => handleDeleteContent(index)}
                      >
                        <AiOutlineDelete className="h-4 w-4" />
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MdOutlineKeyboardArrowDown className="h-4 w-4 transition-transform duration-300" style={{
                            transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)"
                          }} />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>

                  <CollapsibleContent className="space-y-4 mt-4">
                    {/* Video Title */}
                    <FormField
                      control={form.control}
                      name={`courseContentData.${index}.title`}
                      rules={{ required: "Video title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Title *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter video title"
                              value={item.title}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].title = e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Video URL */}
                    <FormField
                      control={form.control}
                      name={`courseContentData.${index}.url`}
                      rules={{ 
                        required: "Video URL is required",
                        pattern: {
                          value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                          message: "Please enter a valid URL"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter video URL"
                              value={item.url}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].url = e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name={`courseContentData.${index}.suggestion`}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter video description"
                              value={item.suggestion}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].suggestion = e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Links */}
                    <div>
                      <FormLabel className="mb-2">Additional Links *</FormLabel>
                      {item.links.map((link: any, linkIndex: number) => (
                        <div
                          key={linkIndex}
                          className="flex items-end gap-2 mb-3"
                        >
                          {/* Link Title */}
                          <FormField
                            control={form.control}
                            name={`courseContentData.${index}.links.${linkIndex}.title`}
                            rules={{ required: "Link title is required" }}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Link Title"
                                    value={link.title}
                                    onChange={(e) => {
                                      const updatedData = [
                                        ...courseContentData,
                                      ];
                                      updatedData[index].links[linkIndex].title =
                                        e.target.value;
                                      setCourseContentData(updatedData);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Link URL */}
                          <FormField
                            control={form.control}
                            name={`courseContentData.${index}.links.${linkIndex}.url`}
                            rules={{
                              required: "Link URL is required",
                              pattern: {
                                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                                message: "Please enter a valid URL"
                              }
                            }}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Link URL"
                                    value={link.url}
                                    onChange={(e) => {
                                      const updatedData = [
                                        ...courseContentData,
                                      ];
                                      updatedData[index].links[linkIndex].url =
                                        e.target.value;
                                      setCourseContentData(updatedData);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Delete Link */}
                          {item.links.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links.splice(linkIndex, 1);
                                setCourseContentData(updatedData);
                                toast.info("Link removed");
                              }}
                            >
                              <AiOutlineDelete className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}

                      {/* Add More Link */}
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links.push({
                            title: "",
                            url: "",
                          });
                          setCourseContentData(updatedData);
                        }}
                      >
                        <BsLink45Deg className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* Add New Content + Add New Section */}
            <div className="flex justify-center mt-6 gap-3">
              <Button type="button" onClick={handleAddContent}>
                Add New Content
              </Button>
              <Button type="button" variant="secondary" onClick={handleAddSection}>
                Add New Section
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActive(active - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <Button 
                type="button" 
                onClick={handleNext}
                disabled={courseContentData.length === 0 || 
                  courseContentData.some((item: any) => 
                    !item.title || !item.url || !item.videoSection || !item.suggestion
                  ) ||
                  courseContentData.some((item: any) => 
                    item.links.some((link: any) => !link.title || !link.url)
                  )
                }
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <br />
      <br />
    </Card>
  );
}